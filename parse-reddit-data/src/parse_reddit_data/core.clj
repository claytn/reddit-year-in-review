(ns parse-reddit-data.core
  (:require
    [amazonica.aws.s3 :as s3]
    [clojure.data.json :as json]
    [environ.core :refer [env]]
    [parse-reddit-data.utils :as utils])
  (:gen-class))

(def cred {
     :access-key (env :access-key)
     :secret-key (env :secret-key)
     :endpoint "us-east-2"
   })

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

(defn write-to-s3-aggregated-data [category date-string json-string]
  (let [json-as-bytes (.getBytes json-string "UTF-8")
        input-stream (java.io.ByteArrayInputStream. json-as-bytes)]
    (s3/put-object cred
                   :bucket-name "aggregated-reddit-data"
                   :key (str category "/" date-string ".json")
                   :input-stream input-stream
                   :metadata {:content-length (count json-as-bytes)
                              :content-type "application/json"})))

(defn aggregate-single-day-reddit-posts [date-string]
  (let [top-posts-keys (get-day-s3-keys date-string "TopPosts")]
    (->> top-posts-keys
         parse-s3-object-json
         (get-top-distinct-posts 3)
         json/write-str
         (write-to-s3-aggregated-data "TopPosts" date-string))))

(defn aggregate-single-day-trending-subreddits [date-string]
  ;; all s3 keys are pointing to a file with the same json - only reading from one key to avoid redundancy.
  (let [[trending-subreddit-key & _] (get-day-s3-keys date-string "TrendingSubreddits")]
    (->> [trending-subreddit-key]
         parse-s3-object-json
         json/write-str
         (write-to-s3-aggregated-data "TrendingSubreddits" date-string))))

(defn aggregate-single-day-data
  "Aggregates reddit posts and trending subreddits for a single date-string(YYYY-MM-DD)"
  [date-string]
  (aggregate-single-day-reddit-posts date-string)
  (aggregate-single-day-trending-subreddits date-string))

(defn aggregate-range-of-days-data
  "Aggregates reddit posts and trending subreddits for a range of dates"
  [from-date-string to-date-string]
  (let [from (utils/parse-date from-date-string)
        to (utils/parse-date to-date-string)
        dates (utils/date-range from to)
        date-strings (map utils/unparse-date dates)]
    (for [date-string date-strings] (aggregate-single-day-data date-string))))

(def command-line-error-message "Must include either a single date or a range of dates.\nExamples:
  java -jar <jar-file-name>.jar YYYY-MM-DD\n
  java -jar <jar-file-name>.jar YYYY-MM-DD YYYY-MM-DD")

(defn -main
  [& args]
  (let [argc (count args)]
    (cond
      (= argc 1) (let [[day] args]
                    (aggregate-single-day-data day))
      (= argc 2)  (let [[from to] args]
                    (aggregate-range-of-days-data from to))
      :else (throw (Exception. command-line-error-message)))))
