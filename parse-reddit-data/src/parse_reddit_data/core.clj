(ns parse-reddit-data.core
  (:require
    [amazonica.aws.dynamodbv2 :as dynamo]
    [amazonica.aws.s3 :as s3]
    [clojure.data.json :as json]
    [clj-time.format :as f]
    [clj-time.core :as t]
    [clj-time.predicates :as pr]
    [environ.core :refer [env]]
    [parse-reddit-data.utils :as utils])
  (:use [parse-reddit-data.constants])
  (:gen-class))

(def YEAR 2020)

(def cred {
     :access-key (env :access-key)
     :secret-key (env :secret-key)
     :endpoint "us-east-2"
   })

(defn write-to-s3 [bucket key data]
  (let [json-string (json/write-str data)
        json-as-bytes (.getBytes json-string "UTF-8")
        input-stream (java.io.ByteArrayInputStream. json-as-bytes)]
    (s3/put-object cred
                   :bucket-name bucket
                   :key key
                   :input-stream input-stream
                   :metadata {:content-length (count json-as-bytes)
                              :content-type "application/json"})))

(defn get-day-s3-keys [date-string category]
  (let [s3-keys-wrapper (s3/list-objects-v2 cred {:bucket-name "reddit-year-in-review" :prefix (str date-string "/" category)})]
    (:object-summaries s3-keys-wrapper)))

;; s3-object-key-wrapper -> s3-object-map
(defn fetch-s3-file [{ object-key :key }]
  (s3/get-object cred {:bucket-name "reddit-year-in-review"
                       :key object-key}))

;; [s3-object-key-wrapper] -> [reddit-post-map]
(defn parse-s3-object-json [s3-keys]
  (let [s3-files (map fetch-s3-file s3-keys)
        json-files (map #(slurp (:input-stream %)) s3-files)
        parsed-json (map #(json/read-str %) json-files)]
    (flatten parsed-json)))

(defn post-exists [post posts]
  (let [post-id (get post "id")]
    (some #(= post-id (get % "id")) posts)))

(defn first-n-unique-elements [n unique? elements]
  (letfn [(get-first-uniques [elements acc]
            (let [elem (first elements)]
              (cond
                (= n (count acc)) acc
                (unique? elem acc) (get-first-uniques (rest elements) (conj acc elem))
                :else (get-first-uniques (rest elements) acc))))]
    (get-first-uniques elements '())))

(defn get-top-distinct-posts [n reddit-posts]
  (let [sorted-posts (sort-by #(get % "ups") > reddit-posts)]
    (first-n-unique-elements n (complement post-exists) sorted-posts)))

(defn filter-awardings [awards]
  (map #(select-keys % (vec REQUIRED_AWARDING_KEYS)) awards))

(defn filter-comments [comments]
  (letfn [(filter-comment-data [comment]
            (-> comment
                (select-keys (vec REQUIRED_COMMENT_KEYS))
                (update "author" #(get-in % ["author" "name"]))
                (update "all_awardings" filter-awardings)))]
    (map filter-comment-data comments)))

(defn filter-post-data [post]
  (-> post
      (select-keys (vec REDDIT_POST_KEYS))
      (update "author" #(get-in % ["author" "name"]))
      (update "comments" filter-comments)
      (update "all_awardings" filter-awardings)))

(defn assign-post-id [index post date-string]
  (let [formatter (f/formatter "MMdd")
        date (utils/parse-date date-string)
        id (str (f/unparse formatter date) (get post "id") index)]
    (assoc post "id" id)))

(defn aggregate-single-day-reddit-posts
  "Given a date string yyyy-mm-dd, returns the top 3 distinct posts for that day"
  [date-string]
  (let [top-posts-keys (get-day-s3-keys date-string "TopPosts")
        top-distinct-posts (->> top-posts-keys
                                parse-s3-object-json
                                (get-top-distinct-posts 3))
        posts (->> top-distinct-posts
                   (map filter-post-data)
                   (map-indexed #(assign-post-id %1 %2 date-string)))]
    {:date date-string
     :posts posts}))

(defn aggregate-reddit-data-for-days
  "Aggregates reddit posts for a range of dates"
  [from to]
  (let [dates (utils/date-range from to)
        date-strings (map utils/unparse-date dates)]
    (for [date-string date-strings] (aggregate-single-day-reddit-posts date-string))))

(defn aggregate-reddit-data-for-month
  "Aggregates reddit posts and trending subreddits for a single month"
  [month]
  (if (or (< month 1) (> month 12))
    (throw (Exception. "Invalid month supplied must be 1-12"))
    (let [first-of-month (t/first-day-of-the-month YEAR month)
          end-of-month (t/last-day-of-the-month YEAR month)]
      (aggregate-reddit-data-for-days first-of-month end-of-month))))

(defn get-posts-preview-data [{:keys [date posts]}]
  (let [get-preview-keys #(select-keys % (vec REDDIT_POST_PREVIEW_KEYS))
        previews (map get-preview-keys posts)]
    {:date date :previews previews}))

(defn get-posts-detail-data [{:keys [posts]}]
  (let [get-detail-keys #(select-keys % (vec REDDIT_POST_DETAIL_KEYS))]
    (map get-detail-keys posts)))

(defn generate-month-top-posts [month]
  (let [month-post-data  (aggregate-reddit-data-for-month month)
        month-post-previews (pmap get-posts-preview-data month-post-data)
        month-post-details (pmap get-posts-detail-data month-post-data)]

    (println "WRITING PREVIEW DATA TO S3...")
    (write-to-s3
      "aggregated-reddit-data"
      (str "TopPosts/" (format "%02d" month) "-" YEAR)
      month-post-previews)
    (println "PREVIEW DATA UPLOADS COMPLETE.")

    (println "WRITING POST DETAIL DATA TO DYNAMODB...")
    (let [create-put-request (fn [post-detail]
                              {:put-request
                                {:item {:id (get post-detail "id")
                                        :details (json/write-str (dissoc post-detail "id"))}}})
          requests-batch (map create-put-request (flatten month-post-details))
          ;; DynamoDB limits batch requests to 25
          partitioned-batch-requests (partition-all 25 requests-batch)]
      (doseq [batch partitioned-batch-requests]
        (dynamo/batch-write-item cred
                               :request-items {"reddit-post-details" batch})))
    (println "DETAIL DATA UPLOADS COMPLETE.")))


(def command-line-error-message "Must include either a single date or a range of dates.\nExamples:
  java -jar <jar-file-name>.jar YYYY-MM-DD\n
  java -jar <jar-file-name>.jar YYYY-MM-DD YYYY-MM-DD")

(defn -main
  [& args]
  (let [argc (count args)]
    (cond
      (= argc 1) (let [[day] args]
                    (aggregate-single-day-reddit-posts day))
      (= argc 2)  (let [[from to] args]
                    (aggregate-reddit-data-for-days from to))
      :else (throw (Exception. command-line-error-message)))))
