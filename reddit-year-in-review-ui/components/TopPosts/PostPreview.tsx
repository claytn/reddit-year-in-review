import React, { useState } from "react";
import Link from "next/link";
import * as R from "ramda";
import { Flex, Box, Text, Image } from "components/common";
import { TextThumbnail, LinkThumbnail } from "components/thumbnails";
import { MediaExpand, MediaMinimize } from "components/icons";
import ExpandedView from "./ExpandedView";
import { formatNumber } from "utils";
import { IPostPreview } from "types";

const REDDIT_URL = "https://www.reddit.com";

const getThumbnailComponent = thumbnail => {
  if (thumbnail === "self") {
    return TextThumbnail;
  } else if (thumbnail === "default") {
    return LinkThumbnail;
  } else {
    return () => <Image src={thumbnail} width="70px" maxHeight="70px" />;
  }
};

interface PreviewProps {
  expanded?: boolean;
  selftext_html?: string;
}

const PostPreview: React.FC<IPostPreview & PreviewProps> = props => {
  const {
    author,
    created,
    domain,
    id,
    is_reddit_media_domain,
    is_self,
    is_video,
    media,
    media_only,
    num_comments,
    permalink,
    post_hint,
    subreddit_name_prefixed,
    thumbnail,
    title,
    ups,
    url,
  } = props;

  const isLink = R.equals(post_hint, "link");

  const d = new Date(created * 1000);
  const year = new Intl.DateTimeFormat("en", {
    timeZone: "America/New_York",
    year: "numeric",
  }).format(d);
  const dayOfMonth = new Intl.DateTimeFormat("en", {
    timeZone: "America/New_York",
    day: "2-digit",
  }).format(d);
  const month = new Intl.DateTimeFormat("en", {
    timeZone: "America/New_York",
    month: "short",
  }).format(d);
  const dayOfWeek = new Intl.DateTimeFormat("en", {
    timeZone: "America/New_York",
    weekday: "short",
  }).format(d);
  const formattedDate = `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
  const Thumbnail = getThumbnailComponent(thumbnail);

  const mediaPost = R.not(R.isNil(media));
  const imagePost = R.equals(post_hint, "image");
  const expandableMedia = mediaPost || imagePost;

  const selfText = props.selftext_html;

  const [showExpandedMedia, setShowExpandedMedia] = useState(props.expanded);

  return (
    <Flex flexDirection="column">
      <Flex
        style={{ fontFamily: "Verdana,arial,helvetica,sans-serif" }}
        flexDirection="row"
        mb={8}
      >
        <Flex
          flex={"0 0 6.1ex"}
          pl={5}
          pr={5}
          pt={4}
          marginHorizontal="7px"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
        >
          <div className="up-arrow" />
          <Text color="#c6c6c6" fontSize="13px" fontWeight="bold">
            {formatNumber(ups)}
          </Text>
          <div className="down-arrow" />
        </Flex>

        <Box marginRight={4} marginBottom={4} width={75}>
          <Thumbnail />
        </Box>
        <Flex flex={1} flexDirection="column">
          <Box>
            <Link href={isLink ? url : `/post/${id}`}>
              <a
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  textDecoration: "none",
                  color: "#0000ff",
                  marginRight: "0.4em",
                  display: "inline",
                }}
              >
                {title}
              </a>
            </Link>

            <span style={{ color: "#888", fontSize: 10 }}>
              (
              <a className="silent-link" href={domain}>
                {domain}
              </a>
              )
            </span>
          </Box>
          <Flex flexDirection="row">
            {expandableMedia &&
              (showExpandedMedia ? (
                <MediaMinimize
                  style={{ paddingRight: 5, paddingTop: 2, cursor: "pointer" }}
                  onClick={() => {
                    setShowExpandedMedia(false);
                  }}
                />
              ) : (
                <MediaExpand
                  style={{ paddingRight: 5, paddingTop: 2, cursor: "pointer" }}
                  onClick={() => {
                    setShowExpandedMedia(true);
                  }}
                />
              ))}
            <Flex flexDirection="column">
              <Flex flexDirection="row" pt={"1px"}>
                <Text color="#888" fontSize={10} fontWeight={"400"}>
                  submitted {formattedDate} by{" "}
                  <a
                    href={`${REDDIT_URL}/u/${author}`}
                    style={{ paddingLeft: "0.5em", paddingRight: "0.5em" }}
                  >
                    {author}
                  </a>{" "}
                  to{" "}
                  <a
                    href={`${REDDIT_URL}/${subreddit_name_prefixed}`}
                    style={{ paddingLeft: "0.5em", paddingRight: "0.5em" }}
                  >
                    {subreddit_name_prefixed}
                  </a>
                </Text>
              </Flex>
              <Flex flexDirection="row" pt={1}>
                <Link href={`/post/${id}`}>
                  <a className="post-options silent-link">{`${num_comments} comments`}</a>
                </Link>

                <a
                  href={`${REDDIT_URL}${permalink}`}
                  className="post-options silent-link"
                >
                  original post
                </a>

                <a href="" className="post-options silent-link">
                  share
                </a>
              </Flex>
            </Flex>
          </Flex>
          {expandableMedia && showExpandedMedia ? (
            <Box marginTop={8}>
              <ExpandedView
                media={media}
                url={url}
                type={mediaPost ? "MEDIA_EMBED" : "URL_IMAGE"}
              />
            </Box>
          ) : null}
          {selfText && showExpandedMedia ? (
            <Box
              bg="#fafafa"
              borderWidth={1}
              borderStyle="solid"
              borderColor="#369"
              borderRadius={7}
              py={5}
              px={10}
              my={5}
            >
              <div
                className="dangerously-set-html"
                dangerouslySetInnerHTML={{ __html: selfText }}
              />
            </Box>
          ) : null}
        </Flex>
      </Flex>

      <style jsx>{`
        a.post-options {
          font-weight: bold;
          font-size: 10px;
          padding-right: 8px;
        }
        a.silent-link {
          color: #888;
          text-decoration: none;
        }
        a.silent-link:hover {
          text-decoration: underline;
        }

        .up-arrow {
          background-image: url(https://www.redditstatic.com/sprite-reddit.e5NqNKsOkdA.png);
          background-position: -84px -1654px;
          background-repeat: no-repeat;
          width: 15px;
          height: 14px;
        }

        .down-arrow {
          background-image: url(https://www.redditstatic.com/sprite-reddit.e5NqNKsOkdA.png);
          background-position: -42px -1654px;
          background-repeat: no-repeat;
          width: 15px;
          height: 14px;
        }
      `}</style>
    </Flex>
  );
};

export default PostPreview;
