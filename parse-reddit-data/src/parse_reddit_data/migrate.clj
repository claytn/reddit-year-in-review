(ns parse-reddit-data.migrate
  (:require [amazonica.aws.s3 :as s3]
    [amazonica.aws.dynamodbv2 :as dynamo]
    [clj-time.core :as t]
    [clj-time.format :as f]
    [clojure.data.json :as json]
    [environ.core :refer [env]]
    [parse-reddit-data.utils :as utils])
  (:import java.io.ByteArrayInputStream))

(def cred {
    :access-key (env :access-key)
    :secret-key (env :secret-key)
    :endpoint "us-east-2"
  })
  
(def scheduled-times [
  "00:00"
  "04:00"
  "08:00"
  "12:00"
  "16:00"
  "20:00"])

(defn create-time-interval-dates [date]
  (let [YYYY-MM-DD (f/unparse (f/formatters :year-month-day) date)]
    (map #(str YYYY-MM-DD " " %) scheduled-times)))

(defn dates-to-query [from to]
  (->> (utils/date-range from to)
       (map create-time-interval-dates)
       flatten))

(defn get-dynamo-entry [date-string]
  (dynamo/get-item cred
    :table-name "RedditYearInReview"
    :key {:Date {:s date-string }}))

(defn write-item-to-s3 [item dynamo-date-string]
  (let [dynamo-date-format (f/formatter "yyyy-MM-dd H:m")
        s3-date-format (f/formatter "yyyy-MM-dd:H")
        gmt-date-hour-min (f/parse dynamo-date-format dynamo-date-string)
        est-date-hour-min (t/minus gmt-date-hour-min (t/hours 5))
        date-string (f/unparse (f/formatters :year-month-day) est-date-hour-min) ;; yyyy-MM-dd
        date-string-hour (f/unparse s3-date-format est-date-hour-min)
        top-posts-as-bytes (.getBytes (item :TopPosts) "UTF-8")
        trending-subreddits-as-bytes (.getBytes (item :TrendingSubreddits) "UTF-8")]
    (s3/put-object cred
                   :bucket-name "reddit-year-in-review"
                   :key (str date-string "/TopPosts/" date-string-hour ".json")
                   :input-stream (ByteArrayInputStream. top-posts-as-bytes)
                   :metadata {:content-length (count top-posts-as-bytes)
                              :content-type "application/json"})
    (s3/put-object cred
                   :bucket-name "reddit-year-in-review"
                   :key (str date-string "/TrendingSubreddits/" date-string-hour ".json")
                   :input-stream (ByteArrayInputStream. trending-subreddits-as-bytes)
                   :metadata {:content-length (count trending-subreddits-as-bytes)
                              :content-type "application/json"})))


(defn migrateDynamoToS3 [from-date to-date]
  (let [from (utils/parse-date from-date)
        to (utils/parse-date to-date)]
    (for [date (dates-to-query from to)]
      (let [item-wrapper (get-dynamo-entry date)]
        (write-item-to-s3 (:item item-wrapper) date)))))