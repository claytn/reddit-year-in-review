import React from "react";
import { Flex, Text, Image } from "components/common";

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
  return (
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
};

export default PostPreview;
