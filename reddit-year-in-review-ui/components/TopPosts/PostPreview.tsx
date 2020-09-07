import React from "react";
import { Flex, Text, Image, Link } from "components/common";
import { formatNumber } from "utils";
import { IPostPreview } from "types";

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

  const d = new Date(created * 1000);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const dayOfMonth = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const dayOfWeek = new Intl.DateTimeFormat("en", { weekday: "short" }).format(d);
  const formattedDate = `${dayOfWeek} ${month} ${dayOfMonth} ${year}`;
  return (
    <Flex
      flexDirection="row"
      style={{ fontFamily: "verdana,arial,helvetica,sans-serif", marginBottom: 8 }}
    >
      <Flex
        style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 4 }}
        marginHorizontal="7px"
        flexDirection="column"
        alignItems="center"
      >
        <div
          style={{
            backgroundImage:
              "url(https://www.redditstatic.com/sprite-reddit.e5NqNKsOkdA.png)",
            backgroundPosition: "-84px -1654px",
            backgroundRepeat: "no-repeat",
            width: 15,
            height: 14,
          }}
        />
        <Text color="#c6c6c6" fontSize="13px" fontWeight="bold">
          {formatNumber(ups)}
        </Text>
        <div
          style={{
            backgroundImage:
              "url(https://www.redditstatic.com/sprite-reddit.e5NqNKsOkdA.png)",
            backgroundPosition: "-42px -1654px",
            backgroundRepeat: "no-repeat",
            width: 15,
            height: 14,
          }}
        />
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
            <a href="/" style={{ paddingLeft: "0.5em", paddingRight: "0.5em" }}>
              {author}
            </a>{" "}
            to{" "}
            <a href="/" style={{ paddingLeft: "0.5em", paddingRight: "0.5em" }}>
              {subreddit_name_prefixed}
            </a>
          </Text>
        </Flex>
        <Flex flexDirection="row" pt={"1px"}>
          <Link href="">
            <a className="post-options silent-link">{`${num_comments} comments`}</a>
          </Link>
          <Link href="">
            <a className="post-options silent-link">original post</a>
          </Link>
          <Link href="">
            <a className="post-options silent-link">share</a>
          </Link>
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
      `}</style>
    </Flex>
  );
};

export default PostPreview;
