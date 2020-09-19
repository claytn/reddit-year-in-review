import React, { useState, useEffect, useRef } from "react";
import * as R from "ramda";
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
    <Flex flexDirection="column" marginBottom={3}>
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
  const [postPreviews, setPostPreviews] = useState(posts);
  const [isFetching, setIsFetching] = useState(false);

  const topPostsContainerDefaultHeight = 14058; // update this later.
  const topPostsRef = useRef(null);

  const handleScroll = () => {
    const containerHeight = R.pathOr(
      topPostsContainerDefaultHeight,
      ["current", "clientHeight"],
      topPostsRef
    );
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      0.75 * containerHeight
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching) {
      console.log("Fetching a fresh batch :)");
      // fetch updated items here.
      fetch(
        `https://7a3kude68l.execute-api.us-east-2.amazonaws.com/dev/month-previews/${2}`
      )
        .then(res => res.json())
        .then(newPreviews => {
          console.log(newPreviews);
          setPostPreviews([...postPreviews, ...newPreviews]);
          setIsFetching(false);
        });
    }
  }, [isFetching]);

  return (
    <Flex ref={topPostsRef} flexDirection="column" color="text" bg="bg" {...props}>
      {postPreviews.map(({ date, previews }) => (
        <SingleDayPreviews date={date} previews={previews} key={date} />
      ))}
    </Flex>
  );
};

export default TopPosts;
