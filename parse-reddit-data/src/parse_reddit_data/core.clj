(ns parse-reddit-data.core
  (:require [environ.core :refer [env]])
  (:use [amazonica.aws.dynamodbv2])
  (:gen-class))

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

(defn get-dynamo-entry [day-string]
  (fn [time-string] 
    (get-item cred
      :table-name "RedditYearInReview"
      :key {:Date {:s date-string }})))

(defn get-day-entries [day]
  (map (get-dynamo-entry day) scheduled-times))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "hello, world"))
