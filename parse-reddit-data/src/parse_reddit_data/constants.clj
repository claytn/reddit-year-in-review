(ns parse-reddit-data.constants
  (:require [clojure.set :as set]))

(def YEAR 2020)

(def REDDIT_POST_DETAIL_KEYS #{"id"
                               "comments"
                               "selftext"
                               "selftext_html"})

(def REDDIT_POST_PREVIEW_KEYS #{"author"
                                "created"
                                "domain"
                                "id"
                                "is_reddit_media_domain"
                                "is_self"
                                "is_video"
                                "media"
                                "media_only"
                                "num_comments"
                                "permalink"
                                "post_hint"
                                "subreddit_name_prefixed"
                                "thumbnail"
                                "title"
                                "ups"
                                "url"})

(def REDDIT_POST_KEYS (set/union REDDIT_POST_PREVIEW_KEYS REDDIT_POST_DETAIL_KEYS))

(def REQUIRED_COMMENT_KEYS #{"author"
                            "body"
                            "body_html"
                            "created"
                            "permalink"
                            "ups"})
