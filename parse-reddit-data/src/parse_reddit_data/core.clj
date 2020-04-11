(ns parse-reddit-data.core
  (:require
    [amazonica.aws.dynamodbv2 :as dynamo]
    [amazonica.aws.s3 :as s3]
    [clojure.data.json :as json]
    [clj-time.format :as f]
    [clj-time.core :as t]
    [environ.core :refer [env]]
    [parse-reddit-data.utils.dates :as d])
  (:use [parse-reddit-data.constants])
  (:gen-class))

(def cred {
     :access-key (env :access-key)
     :secret-key (env :secret-key)
     :endpoint "us-east-2"
   })

(defn get-day-s3-keys [date-string category]
  (let [s3-keys-wrapper (s3/list-objects-v2 cred {:bucket-name "reddit-year-in-review" :prefix (str date-string "/" category)})]
    (:object-summaries s3-keys-wrapper)))

(defn fetch-s3-object [{ object-key :key }]
  (s3/get-object cred {:bucket-name "reddit-year-in-review"
                       :key object-key}))

(defn get-day-posts [date-string]
  (let [s3-keys (get-day-s3-keys date-string "TopPosts")
        s3-files (pmap fetch-s3-object s3-keys)
        json-files (pmap #(slurp (:input-stream %)) s3-files)
        parsed-json (pmap #(json/read-str %) json-files)]
    (flatten parsed-json)))

(defn write-to-s3-as-json [bucket key data]
  (let [json-string (json/write-str data)
        json-as-bytes (.getBytes json-string "UTF-8")
        input-stream (java.io.ByteArrayInputStream. json-as-bytes)]
    (s3/put-object cred
                   :bucket-name bucket
                   :key key
                   :input-stream input-stream
                   :metadata {:content-length (count json-as-bytes)
                              :content-type "application/json"})))

(defn get-top-distinct-posts [n posts]
  (let [groups (vals (group-by #(get % "id") posts))
        sorted-groups (map #(sort-by (fn [post] (get post "ups")) > %) groups)
        distinct-posts (map first sorted-groups)
        sorted-posts (sort-by #(get % "ups") > distinct-posts)]
    (take n sorted-posts)))

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

(defn update-post-id [post date-string]
  "Creates a unique ID for each post using it's original id (from reddit) and the date the post
   was collected. We can assume the same post won't be a part of a single day's aggregates
   (refer to get-top-distinct-posts)"
  (let [formatter (f/formatter "MMdd")
        date (d/parse-date date-string)
        id (str (f/unparse formatter date) (get post "id"))]
    (assoc post "id" id)))

(defn aggregate-single-day-reddit-posts
  "Given a date string yyyy-mm-dd, returns the top 3 distinct posts for that day"
  [date-string]
  (let [posts (get-day-posts date-string)
        top-distinct-posts (->> posts
                                (get-top-distinct-posts 3)
                                (map filter-post-data)
                                (map #(update-post-id % date-string)))]
    {:date date-string
     :posts top-distinct-posts}))

(defn aggregate-reddit-data-for-days
  "Aggregates reddit posts for a range of dates"
  [from to]
  (let [dates (d/date-range from to)
        date-strings (map d/unparse-date dates)]
    (for [date-string date-strings] (aggregate-single-day-reddit-posts date-string))))

(defn aggregate-reddit-data-for-month
  "Aggregates reddit posts and trending subreddits for a single month"
  [month]
  (if (or (< month 1) (< 12 month))
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

(defn populate-month-aggregate-datastores [month]
  "Given a month (int), aggregates the top reddit posts, and writes to our datastores (S3, DynamoDB)"
  (let [month-post-data  (aggregate-reddit-data-for-month month)
        month-post-previews (pmap get-posts-preview-data month-post-data)
        month-post-details (pmap get-posts-detail-data month-post-data)]

    ;; Write preview data to S3 store
    (write-to-s3-as-json
      "aggregated-reddit-data"
      (str "TopPosts/" (format "%02d" month) "-" YEAR) ;; "TopPosts/MM-YYYY"
      month-post-previews)

    ;; Write post detail data to DynamoDB
    (let [create-put-request (fn [post-detail]
                               {:put-request
                                {:item {:id (get post-detail "id")
                                        :details (json/write-str (dissoc post-detail "id"))}}})
          requests (map create-put-request (flatten month-post-details))
          ;; DynamoDB batch-write limits 25 requests
          partitioned-batch-requests (partition-all 25 requests)]
      (doseq [batch partitioned-batch-requests]
        (dynamo/batch-write-item
          cred
          :request-items {"reddit-post-details" batch})))))


(def command-line-error-message "Must include a valid month (1-12).\nExamples:
  java -jar <jar-file-name>.jar 1
  java -jar <jar-file-name>.jar 12")

(defn -main
  [& args]
  (let [argc (count args)]
    (cond
      (= argc 1) (let [[month] args]
                   (populate-month-aggregate-datastores month))
      :else (throw (Exception. command-line-error-message)))))
