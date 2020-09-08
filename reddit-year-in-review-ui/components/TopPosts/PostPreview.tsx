import React from "react";
import { Flex, Text, Image, Link } from "components/common";
import { formatNumber } from "utils";
import { IPostPreview } from "types";

const REDDIT_URL = "https://www.reddit.com";

const PostPreview: React.FC<IPostPreview> = props => {
  const {
    all_awardings,
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
    thumbnailHeight,
    thumbnailWidth,
    title,
    ups,
    url,
  } = props;

  // console.log(props);

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
  return (
    <Flex
      flexDirection="row"
      style={{ fontFamily: "verdana,arial,helvetica,sans-serif", marginBottom: 8 }}
    >
      <Flex
        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 4, width: 50 }}
        marginHorizontal="7px"
        flexDirection="column"
        alignItems="center"
      >
        <div className="up-arrow" />
        <Text color="#c6c6c6" fontSize="13px" fontWeight="bold">
          {formatNumber(ups)}
        </Text>
        <div className="down-arrow" />
      </Flex>

      <Flex style={{ marginRight: 5, marginBottom: 2 }}>
        <Image src={thumbnail} width="70px" maxHeight="70px" />
      </Flex>
      <Flex flexDirection="column">
        <div>
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

          <span style={{ color: "#888", fontSize: 10 }}>
            (
            <a className="silent-link" href={domain}>
              {domain}
            </a>
            )
          </span>
        </div>
        <Flex flexDirection="row" pt={"1px"}>
          <Text style={{ color: "#888", fontSize: 10, fontWeight: 400 }}>
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
        <Flex flexDirection="row" pt={"1px"}>
          <Link href="">
            <a className="post-options silent-link">{`${num_comments} comments`}</a>
          </Link>

          <a href={`${REDDIT_URL}${permalink}`} className="post-options silent-link">
            original post
          </a>

          <a href="" className="post-options silent-link">
            share
          </a>
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
