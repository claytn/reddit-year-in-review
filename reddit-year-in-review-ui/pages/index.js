import { ThemeProvider } from "styled-components";

import Layout from "../components/Layout";
import { Flex, Box } from "../components/common";

const Index = () => {
  return (
    <Layout>
      <Flex flexDirection="row">
        <Flex
          m={2}
          width={[0.5]}
          height={"100px"}
          color="text"
          bg="bg"
          border="1px solid"
          borderColor="secondary"
        >
          quick jump box / calendar view
        </Flex>
        <Flex
          m={2}
          width={[1]}
          height={"100px"}
          color="text"
          bg="bg"
          border="1px solid"
          borderColor="secondary"
        >
          main content section
        </Flex>
        <Flex
          m={2}
          width={[0.5]}
          height={"100px"}
          color="text"
          bg="bg"
          border="1px solid"
          borderColor="secondary"
        >
          trending subreddits
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Index;
