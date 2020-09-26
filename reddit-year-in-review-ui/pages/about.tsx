import React from "react";
import { Flex } from "components/common";
import Layout from "components/common/Layout";

const About: React.FC = () => {
  return (
    <Layout page="about">
      <Flex
        m={2}
        width={[0.5]}
        height={"100px"}
        color="text"
        bg="bg"
        border="1px solid"
        borderColor="secondary"
      >
        about page.
      </Flex>
    </Layout>
  );
};

export default About;
