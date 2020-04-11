(ns parse-reddit-data.core-test
  (:require [clojure.test :refer :all]
            [parse-reddit-data.core :refer :all]))

(deftest get-top-distinct-posts-test
  (let [empty '()
        one '({"id" "test_id", "ups" 100})
        multi '({"id" "test_id_1", "ups" 100}
               {"id" "test_id_1", "ups" 101}
               {"id" "test_id_2", "ups" 100}
               {"id" "test_id_2", "ups" 99}
               {"id" "test_id_2", "ups" 98})]
    (is (= empty (get-top-distinct-posts 5 empty)))
    (is (= one (get-top-distinct-posts 3 one)))
    (let [expected-top-distinct-posts [{"id" "test_id_1", "ups" 101}
                                       {"id" "test_id_2", "ups" 100}]]
      (is (= expected-top-distinct-posts (get-top-distinct-posts 2 multi))))))

(deftest update-post-id-test
  (let [post {"id" "old_reddit_id"}
        new-id "0101old_reddit_id"]
    (is (= new-id (get (update-post-id post "2020-01-01") "id")))))



