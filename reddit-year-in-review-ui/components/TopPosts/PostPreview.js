const PostPreview = ({
  id /** self generated */,
  title,
  author,
  subreddit,
  date_created /** werid utc time. idk how to parse this. */,
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
  /** Below are the only remaining pieces need for the full page post */
  media,
  comments
}) => (
  <Flex flexDirection="row">
    <Flex>
      <code>^</code>
      {ups}
    </Flex>
    <Flex>
      <Text>{title}</Text>
      <Flex>
        <Text>{subreddit}</Text>
        <Text>
          Posted by {author} {date}
        </Text>
      </Flex>
    </Flex>
  </Flex>
);

export default PostPreview;
