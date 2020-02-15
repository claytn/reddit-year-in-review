const PostPreview = ({ title, author, subreddit, date, ups, downs }) => (
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
