(ns parse-reddit-data.core
  (:require
    [amazonica.aws.s3 :as s3]
    [clojure.data.json :as json]
    [environ.core :refer [env]])
  (:gen-class))

(def cred {
           :access-key (env :access-key)
           :secret-key (env :secret-key)
           :endpoint "us-east-2"
           })

(def bucket "reddit-year-in-review")
(def output-bucket "reddit-year-in-review-aggregates")

(def categories ["TopPosts" "TrendingSubreddits"])

(defn get-day-s3-keys [date-string category]
  (let [s3-keys-wrapper (s3/list-objects-v2 cred {:bucket-name bucket :prefix (str date-string "/" category)})]
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

(defn- post-exists [post posts]
  (let [post-id (get post "id")]
    (some #(= post-id (get % "id")) posts)))

(defn get-top-distinct-posts [n reddit-posts]
  (letfn [(first-unique-posts
            [sorted-posts top-distinct-posts]
            (let [post (first sorted-posts)]
              (cond
                (= n (count top-distinct-posts)) top-distinct-posts
                (post-exists post top-distinct-posts) (first-unique-posts (rest sorted-posts) top-distinct-posts)
                :else (first-unique-posts (rest sorted-posts) (conj top-distinct-posts post))))
            )]
    (let [sorted-posts (sort-by #(get % "ups") > reddit-posts)
          empty-list '()]
      (first-unique-posts sorted-posts empty-list))))

(defn write-to-s3 [date-string json-string]
  (let [json-as-bytes (.getBytes json-string "UTF-8")
        input-stream (java.io.ByteArrayInputStream. json-as-bytes)]
    (s3/put-object cred
                   :bucket-name "aggregated-reddit-data"
                   :key (str "TopPosts" "/" date-string ".json")
                   :input-stream input-stream
                   :metadata {:content-length (count json-as-bytes)
                              :content-type "application/json"})))

(defn aggregate-reddit-day [date-string]
  (let [top-posts-keys (get-day-s3-keys date-string "TopPosts")
        trending-subreddit-keys (get-day-s3-keys date-string "TrendingSubreddits")]
    (->> top-posts-keys
         parse-s3-object-json
         (get-top-distinct-posts 3)
         json/write-str
         (write-to-s3 date-string))))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "hello, world"))
