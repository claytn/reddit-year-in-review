import React from "react";
import { Flex } from "components/common";
import PostPreview from "./PostPreview";

import { IPostPreview } from "types";

interface IPostPreviewBlock {
  date: string;
  previews: IPostPreview[];
}

const SingleDayPreviews: React.FC<IPostPreviewBlock> = ({ date, previews }) => (
  <Flex flexDirection="column" mb={2}>
    <Flex border="1px solid" borderColor="secondary">
      <code>{date}</code>
    </Flex>
    {previews.map(post => (
      <PostPreview {...post} key={post.id} />
    ))}
  </Flex>
);

const TopPosts: React.FC<{ posts: IPostPreviewBlock[] }> = ({ posts, ...props }) => (
  <Flex
    flexDirection="column"
    color="text"
    bg="bg"
    border="1px solid"
    borderColor="secondary"
    {...props}
  >
    {posts.map(({ date, previews }) => (
      <SingleDayPreviews date={date} previews={previews} key={date} />
    ))}
  </Flex>
);

export default TopPosts;
