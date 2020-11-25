export type IPage = "top" | "about";

export interface IPostPreviewBlock {
  date: string;
  previews: IPostPreview[];
}

export interface IPostPreview {
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
  title: string;
  ups: number;
  url: string;
}

export interface IComment {
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
