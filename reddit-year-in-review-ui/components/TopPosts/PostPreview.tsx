import { Flex, Text, Image } from "../common";

const PostPreview = ({
  id /** self generated */,
  title,
  author,
  subreddit_name_prefixed,
  created,
  ups,
  thumbnail,
  thumbnailHeight,
  thumbnailWidth,
  permaLink,
  url,
  commentCount,
  awards,
  postHint,
  isVideo,
  isSelf,
  selfText,
  num_comments,
}) => (
  <Flex flexDirection="row">
    <Flex p={2} width={[1 / 8]}>
      {ups}
    </Flex>
    <Flex p={2} width={[1 / 8]}>
      <Image src={thumbnail} width="70px" maxHeight="70px" />
    </Flex>
    <Flex p={2} width={[7 / 8]} flexDirection="column">
      <Text>{title}</Text>
      <Flex flexDirection="row">
        <Text>
          Submitted {new Date(created * 1000).toString()} by {author} to{" "}
          {subreddit_name_prefixed}
        </Text>
      </Flex>
      <Flex>
        <a href="">{`${num_comments} comments`}</a>
      </Flex>
    </Flex>
  </Flex>
);

export default PostPreview;
