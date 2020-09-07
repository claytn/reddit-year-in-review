import React from "react";
import { GetStaticProps } from "next";
import InferGetStaticPropsType from "next/types";
import * as R from "ramda";
import Layout from "components/common/Layout";
import { Flex } from "components/common";

import QuickSearch from "components/QuickSearch";
import TopPosts from "components/TopPosts";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import testJson from "test-resources/01-2020.json";

export const getStaticProps: GetStaticProps = async context => {
  /*  const res = await fetch("");
  const posts = await res.json(); */

  return {
    props: {
      posts: testJson,
    },
  };
};

const Index: React.FC<{ posts: any[] }> = pageProps => {
  const posts = pageProps.posts || [];
  return (
    <Layout>
      <Tabs>
        <TabList>
          <Tab style={{ borderRadius: 0 }}>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
      <Flex flexDirection="row">
        <TopPosts posts={posts} m={2} width={[1]} />
        <QuickSearch m={2} width={[1 / 3]} />
      </Flex>
    </Layout>
  );
};

export default Index;
