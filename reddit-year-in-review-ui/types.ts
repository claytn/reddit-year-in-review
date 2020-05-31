export interface IAwarding {
  count: number;
  name: string;
  icon_url: string;
}

export interface IPostPreview {
  all_awardings: IAwarding[];
  author: string;
  created: number;
  domain?: string;
  id: string;
  is_reddit_media_domain?: boolean;
  is_self?: boolean;
  is_video?: boolean;
  media?: object;
  media_only?: boolean;
  num_comments: number;
  permalink: string;
  post_hint?: string;
  subreddit_name_prefixed: string;
  thumbnail?: string;
  thumbnailHeight?: number;
  thumbnailWidth?: number;
  title: string;
  ups: number;
  url: string;
}

export interface IComment {
  all_awardings: IAwarding[];
  author: string;
  body: string;
  body_html: string;
  created: number;
  permalink: string;
  ups: number;
}

/** TODO: make sure this is the overlap you want. */
export interface IPost extends IPostPreview {
  id: string;
  comments: Comment[];
  selftext?: string;
  selftext_html?: string;
}
