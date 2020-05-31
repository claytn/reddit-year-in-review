import React from "react";
import { Flex } from "components/common";

const About: React.FC = () => {
  return (
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
  );
};

export default About;
