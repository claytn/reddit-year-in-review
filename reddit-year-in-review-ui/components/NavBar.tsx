import React from "react";
import { Flex, Text } from "components/common";

const NavBar: React.FC = () => {
  return (
    <Flex flexDirection="column">
      <Flex
        height={18}
        backgroundColor="#f0f0f0"
        flexDirection="row"
        padding="2px"
        borderBottomStyle="solid"
        borderColor="rgb(128, 128, 128)"
        borderBottomWidth="1px"
      >
        <Text fontSize="10px" color="#000">
          FEATURED SUBREDDITS |
        </Text>
      </Flex>
      <Flex
        height={45}
        px={1}
        pt={1}
        borderBottom="1px solid"
        borderBottomColor="rgb(95, 153, 207)"
        flexDirection="row"
        alignItems="flex-end"
        backgroundColor="#cee3f8"
      >
        <Flex alignItems="flex-start">
          <Text
            style={{
              fontSize: 22,
              fontFamily: "cursive",
              paddingRight: 10,
            }}
          >
            A year in review for...
          </Text>
          <img src="/assets/reddit_logo.png" alt="reddit" width="80" height="28" />
          <Text style={{ marginLeft: 20, fontFamily: "monospace", alignSelf: "center" }}>
            (not affiliated with reddit)
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
