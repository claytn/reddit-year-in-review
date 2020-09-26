import React from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import Layout from "components/common/Layout";
import { Flex, Text } from "components/common";

import QuickSearch from "components/QuickSearch";
import TopPosts from "components/TopPosts";

import testJson from "test-resources/01-2020.json";

const validMonth = (x: number) => {
  if (x === NaN) {
    return false;
  }

  return x >= 1 && x <= 12;
};

export const getStaticProps: GetStaticProps = async context => {
  /*  const res = await fetch("");
  const posts = await res.json(); */
  return {
    props: {
      posts: testJson,
    },
  };
};

const Index: React.FC<{ posts: any[] }> = ({ posts: preloadedPosts }) => {
  const router = useRouter();
  const { month = "1" } = router.query;

  const { data = [], isValidating, error } = useSWR(`posts/${month}`, async () => {
    const monthInt = parseInt(month as string);
    if (monthInt === 1 || !validMonth(monthInt)) {
      return preloadedPosts;
    }

    const res = await fetch(
      `https://7a3kude68l.execute-api.us-east-2.amazonaws.com/dev/month-previews/${month}`
    );

    return res.json();
  });

  return (
    <Layout page={"top"}>
      <Flex flexDirection="row">
        {!isValidating && <TopPosts posts={data} m={1} width={[1]} />}
        {/* <QuickSearch width={[1 / 3]} /> */}
      </Flex>
    </Layout>
  );
};

export default Index;
