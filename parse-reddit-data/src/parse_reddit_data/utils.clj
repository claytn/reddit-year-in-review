(ns parse-reddit-data.utils
  (:require [clj-time.format :as f]
            [clj-time.core :as t]))

(defn parse-date [yyyy-mm-dd]
  (f/parse (f/formatter :date) yyyy-mm-dd))

(defn unparse-date [joda-date-obj]
  (f/unparse (f/formatter :date) joda-date-obj))

(defn date-range [from to]
  (if (t/equal? from to)
    (cons to nil)
    (lazy-seq (cons from (date-range (t/plus from (t/days 1)) to)))))

