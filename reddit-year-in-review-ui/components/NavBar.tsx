import React from "react";
import { Flex, Text } from "components/common";
import { IPage } from "pages/types";
import Tab from "components/Tab";

const tabs: Array<{ name: IPage; route: string }> = [
  { name: "top", route: "/" },
  { name: "about", route: "/about" },
];

interface Props {
  activePage: IPage;
}

const NavBar: React.FC<Props> = ({ activePage }) => {
  return (
    <Flex flexDirection="column">
      <Flex
        style={{
          alignItems: "center",
        }}
        height={"18px"}
        backgroundColor="#f0f0f0"
        flexDirection="row"
        paddingLeft={1}
        paddingRight={1}
        paddingBottom={0}
        borderBottomStyle="solid"
        borderColor="rgb(128, 128, 128)"
        borderBottomWidth="1px"
      >
        <Text
          fontSize="10px"
          color="#000"
          fontWeight="400"
          style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
        >
          FEATURED SUBREDDITS | ASKREDDIT - HUMANSBEINGBROS - UNEXPECTED - MEMES - AWW -
          GAMING - NEXTFUCKINGLEVEL - MILDLYINTERESTING - WELLTHATSUCKS - SHOWERTHOUGHTS -
          BLACKPEOPLETWITTER - DANKMEMES - PUBLICFREAKOUT - WORLDNEWS
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
        <Flex alignItems="flex-start" justifyContent="flex-end">
          <img
            style={{ paddingBottom: 10 }}
            src="/assets/reddit_logo.png"
            alt="reddit"
            width="80"
            height="28"
          />
          <Text
            style={{
              fontSize: 22,
              paddingRight: 10,
              fontFamily: "Pangolin, cursive",
            }}
          >
            ...year in review
          </Text>
          <Text style={{ marginLeft: 20, fontFamily: "monospace", alignSelf: "center" }}>
            (not affiliated with reddit)
          </Text>
        </Flex>
        <Flex>
          {tabs.map(({ name, route }) => (
            <Tab active={name === activePage} label={name} route={route} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
