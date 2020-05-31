import React from "react";
import { GetStaticProps } from "next";
import InferGetStaticPropsType from "next/types";
import * as R from "ramda";
import Layout from "../components/common/Layout";
import { Flex } from "../components/common";

import QuickSearch from "../components/QuickSearch";
import TopPosts from "../components/TopPosts";
import TrendingSubreddits from "../components/TrendingSubreddits";

import testJson from "../test-resources/01-2020.json";

export const getStaticProps: GetStaticProps = async context => {
  /*  const res = await fetch("");
  const posts = await res.json(); */

  return {
    props: {
      posts: testJson,
    },
  };
};

const Index: React.FC<{ posts: object }> = pageProps => {
  const posts = pageProps.posts || [];
  return (
    <Layout>
      <Flex flexDirection="row">
        <TopPosts posts={posts} m={2} width={[1]} />
        <QuickSearch m={2} width={[1 / 3]} />
      </Flex>
    </Layout>
  );
};

export default Index;
