(ns parse-reddit-data.core
  (:require [environ.core :refer [env]]
    [amazonica.aws.s3 :as s3]
    [amazonica.aws.dynamodbv2 :as dynamo])
  (:gen-class))


(comment 
    (def cred {
        :access-key (env :access-key)
        :secret-key (env :secret-key)
        :endpoint "us-east-2"
      })


    (defn get-reddit-day [day]
      (-> (s3/list-objects-v2 {:bucket-name "reddit-year-in-review" :prefix day})
          
        )))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "hello, world"))
