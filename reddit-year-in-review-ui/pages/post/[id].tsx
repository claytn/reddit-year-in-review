import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { Box, Flex, Text } from "components/common";
import Layout from "components/Layout";
import PostPreview from "components/TopPosts/PostPreview";
import Comment from "components/TopPosts/Comment";

import { IComment } from "types";

const Post: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(
    `post/${id}`,
    async () => {
      if (id) {
        const res = await fetch(
          `https://${process.env.NEXT_PUBLIC_API_URL}/PostDetails/${id}`
        );

        return res.json();
      }
    },
    {
      revalidateOnFocus: false,
      focusThrottleInterval: Infinity,
    }
  );

  if (data) {
    return (
      <Layout page={"top"} footer>
        <Box marginTop={10} paddingRight={"10%"}>
          <PostPreview {...data} id={id} selftext_html={data.selftext_html} expanded />
        </Box>
        <Flex
          paddingLeft={5}
          paddingBottom={3}
          borderBottomWidth={1}
          borderBottomColor={"gray"}
          borderBottomStyle="dotted"
        >
          <Text>top {data.comments.length} comments</Text>
        </Flex>
        <Flex flexDirection="column" paddingTop={5}>
          {data.comments.map((commentProps: IComment, index) => {
            return <Comment {...commentProps} key={index} />;
          })}
        </Flex>
      </Layout>
    );
  }

  return <Layout page="top" footer />;
};

export default Post;
