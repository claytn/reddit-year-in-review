import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flex, Text } from "components/common";
import PostPreview from "./PostPreview";
import { getOrdinalNum } from "utils";

import { IPostPreviewBlock } from "types";

const SingleDayPreviews: React.FC<IPostPreviewBlock> = ({ date, previews }) => {
  const d = new Date(`${date}T00:00:00`);
  const dayOfMonth = d.getDate();
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
  const formattedDate = `${month} ${getOrdinalNum(dayOfMonth)}`;

  return (
    <Flex flexDirection="column" marginBottom={2}>
      <Flex my={2}>
        <Text
          borderStyle="solid"
          borderColor="#ff4500"
          borderTop="0"
          borderBottom="0"
          color="#888"
          fontSize={10}
          fontWeight="bold"
          marginLeft={1}
          marginBottom={"10px"}
          px={1}
        >
          {formattedDate}
        </Text>
      </Flex>
      {previews.map(post => (
        <PostPreview {...post} key={post.id} />
      ))}
    </Flex>
  );
};

const TopPosts: React.FC<{ posts: IPostPreviewBlock[] }> = ({ posts, ...props }) => {
  const router = useRouter();
  const { month = "1" } = router.query;
  const monthInt = parseInt(month as string);
  const lastPage = monthInt === 12;

  return (
    <Flex flexDirection="column" color="text" bg="bg" {...props}>
      {posts.map(({ date, previews }) => (
        <SingleDayPreviews date={date} previews={previews} key={date} />
      ))}
      {!lastPage && (
        <Flex alignItems="center">
          <Text color="gray" fontSize={12} px={1}>
            view more:{" "}
          </Text>
          <div>
            <Link href={`/?month=${monthInt + 1}`}>
              <a
                style={{
                  padding: "1px 4px",
                  background: "#eee",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#ddd",
                  borderRadius: 3,
                  fontWeight: "bold",
                  textDecoration: "none",
                  fontFamily: "verdana,arial,helvetica,sans-serif",
                  color: "#369",
                  fontSize: 12,
                }}
              >
                next ›
              </a>
            </Link>
          </div>
        </Flex>
      )}
    </Flex>
  );
};

export default TopPosts;
