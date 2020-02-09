(ns parse-reddit-data.migrate
  (:require [amazonica.aws.s3 :as s3]
    [amazonica.aws.dynamodbv2 :as dynamo]
    [clj-time.core :as t]
    [clj-time.format :as f]
    [clojure.data.json :as json]
    [environ.core :refer [env]])
  (:import [java.io File]))

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

(defn create-range-iter [from to dates]
  (if (t/equal? from to)
    (cons to dates)
    (create-range-iter (t/plus from (t/days 1)) to (cons from dates))))

(defn create-date-range [from to]
  (create-range-iter from to '()))

(defn create-time-interval-dates [date]
  (let [YYYY-MM-DD (f/unparse (f/formatters :year-month-day) date)]
    (map #(str YYYY-MM-DD " " %) scheduled-times)))

(defn dates-to-query [from to]
  (->> (create-date-range from to)
       (map create-time-interval-dates)
       flatten))

(defn get-dynamo-entry [date-string]
  (dynamo/get-item cred
    :table-name "RedditYearInReview"
    :key {:Date {:s date-string }}))

(def topPostsFile (java.io.File. "topPosts.json"))
(def trendingSubredditsFile (java.io.File. "trendingSubreddits.json"))

(defn write-item-to-s3 [item dynamo-date-string]
  (spit topPostsFile (item :TopPosts))
  (spit trendingSubredditsFile (item :TrendingSubreddits))
  (let [dynamo-date-format (f/formatter "yyyy-MM-dd H:m")
        s3-date-format (f/formatter "yyyy-MM-dd:H")
        gmt-date-hour-min (f/parse dynamo-date-format dynamo-date-string)
        est-date-hour-min (t/minus gmt-date-hour-min (t/hours 5))
        date-string (f/unparse (f/formatters :year-month-day) est-date-hour-min) ;; yyyy-MM-dd
        date-string-hour (f/unparse s3-date-format est-date-hour-min)]
    (s3/put-object cred
                  :bucket-name "reddit-year-in-review"
                  :key (str date-string "/TopPosts/" date-string-hour ".json")
                  :file topPostsFile)
    (s3/put-object cred
                   :bucket-name "reddit-year-in-review"
                   :key (str date-string "/TrendingSubreddits/" date-string-hour ".json")
                   :file trendingSubredditsFile)
    ))


(defn migrateToS3 []
  (let [from (t/date-time 2020 02 1)
        to (t/date-time 2020 02 9)]
    (for [date (dates-to-query from to)]
      (let [item (get-dynamo-entry date)]
        (write-item-to-s3 (item :item) date)))
    ))