(ns parse-reddit-data.constants
  (:require [clojure.set :as set]))

(def REDDIT_POST_DETAIL_KEYS #{"id"
                               "comments"
                               "selftext"
                               "selftext_html"})

(def REDDIT_POST_PREVIEW_KEYS #{"all_awardings"
                                "author"
                                "created"
                                "domain"
                                "id"
                                "is_reddit_media_domain"
                                "is_video"
                                "media"
                                "media_only"
                                "num_comments"
                                "permalink"
                                "post_hint"
                                "subreddit_name_prefixed"
                                "thumbnail"
                                "thumbnail_height"
                                "thumbnail_width"
                                "title"
                                "ups"
                                "url"})

(def REDDIT_POST_KEYS (set/union REDDIT_POST_PREVIEW_KEYS REDDIT_POST_DETAIL_KEYS))

(def REQUIRED_COMMENT_KEYS #{"all_awardings"
                            "author"
                            "body"
                            "body_html"
                            "created"
                            "permalink"
                            "ups"})

(def REQUIRED_AWARDING_KEYS #{"count"
                             "icon_url"
                             "name"})
