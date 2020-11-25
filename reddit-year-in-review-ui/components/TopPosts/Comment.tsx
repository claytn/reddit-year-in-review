import React from "react";
import { Flex, Text } from "components/common";
import { formatNumber } from "utils";
import { IComment } from "types";

const REDDIT_URL = "https://www.reddit.com";

const Comment: React.FC<IComment> = props => {
  const { author, body_html, permalink, ups } = props;

  return (
    <Flex flexDirection="column" my={2}>
      <Flex
        flexDirection="row"
        style={{ fontFamily: "Verdana,arial,helvetica,sans-serif", marginBottom: 8 }}
      >
        <Flex
          style={{ paddingLeft: 8, paddingRight: 8, paddingTop: 4 }}
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
        >
          <div className="up-arrow" />
          <div className="down-arrow" />
        </Flex>

        <Flex flex={1} flexDirection="column">
          <Flex flexDirection="row" paddingBottom={2} alignItems="center">
            <a className="author silent-link" href={`${REDDIT_URL}/u/${author}`}>
              {author}
            </a>{" "}
            <Text color="#888" fontSize={10} paddingLeft={4}>
              {formatNumber(ups)} points
            </Text>
          </Flex>
          <Text fontSize={14} color="#222222">
            <div
              className="dangerously-set-html"
              dangerouslySetInnerHTML={{ __html: body_html }}
            />
          </Text>
          <Flex paddingTop={5}>
            <a href={`${REDDIT_URL}${permalink}`} className="silent-link comment-options">
              permalink
            </a>
          </Flex>
        </Flex>
      </Flex>

      <style jsx>{`
        a.author {
          color: #369;
          font-size: 12px;
          font-weight: bold;
        }
        a.comment-options {
          font-weight: bold;
          font-size: 10px;
          padding-right: 8px;
          color: #888;
        }
        a.silent-link {
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
          margin-bottom: 2px;
        }

        .down-arrow {
          background-image: url(https://www.redditstatic.com/sprite-reddit.e5NqNKsOkdA.png);
          background-position: -42px -1654px;
          background-repeat: no-repeat;
          width: 15px;
          height: 14px;
          margin-top: 2px;
        }
      `}</style>
    </Flex>
  );
};

export default Comment;
