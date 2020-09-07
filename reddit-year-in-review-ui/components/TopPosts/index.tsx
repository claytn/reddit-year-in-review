import React, { useState, useEffect, useRef } from "react";
import * as R from "ramda";
import { Flex } from "components/common";
import PostPreview from "./PostPreview";

import { IPostPreviewBlock } from "types";

const SingleDayPreviews: React.FC<IPostPreviewBlock> = ({ date, previews }) => (
  <Flex flexDirection="column">
    <Flex
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="#888"
      marginBottom={1}
    >
      <code style={{ color: "#888" }}>{date}</code>
    </Flex>
    {previews.map(post => (
      <PostPreview {...post} key={post.id} />
    ))}
  </Flex>
);

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
