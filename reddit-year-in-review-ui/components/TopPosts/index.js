import { Flex } from "../common";
import PostPreview from "./PostPreview";

const SingleDayPosts = ({ date, posts }) => (
  <Flex flexDirection="column" mb={2}>
    <Flex border="1px solid" borderColor="secondary">
      <code>{date}</code>
    </Flex>
    {posts.map((post) => (
      <PostPreview {...post} />
    ))}
  </Flex>
);

const TopPosts = ({ posts, ...props }) => (
  <Flex
    flexDirection="column"
    color="text"
    bg="bg"
    border="1px solid"
    borderColor="secondary"
    {...props}
  >
    {posts.map(({ date, previews }) => (
      <SingleDayPosts date={date} posts={previews} />
    ))}
  </Flex>
);

export default TopPosts;
