import Layout from "../components/common/Layout";
import { Flex } from "../components/common";

import QuickSearch from "../components/QuickSearch";
import TopPosts from "../components/TopPosts";
import TrendingSubreddits from "../components/TrendingSubreddits";

const Index = () => {
  return (
    <Layout>
      <Flex flexDirection="row">
        <QuickSearch />
        <TopPosts />
        <TrendingSubreddits />
      </Flex>
    </Layout>
  );
};

export default Index;
