import React from "react";
import Link from "next/link";

import { Flex, Text } from "components/common";
import { IPage } from "types";
import Tab from "components/Tab";

const tabs: Array<{ name: IPage; route: string }> = [
  { name: "top", route: "/month/1" },
  { name: "about", route: "/about" },
];

const months: Array<{ name: string; value: number }> = [
  { name: "January", value: 1 },
  { name: "February", value: 2 },
  { name: "March", value: 3 },
  { name: "April", value: 4 },
  { name: "May", value: 5 },
  { name: "June", value: 6 },
  { name: "July", value: 7 },
  { name: "August", value: 8 },
  { name: "September", value: 9 },
  { name: "October", value: 10 },
  { name: "November", value: 11 },
  { name: "December", value: 12 },
];

interface Props {
  activePage: IPage;
}

const NavBar: React.FC<Props> = ({ activePage }) => {
  return (
    <Flex flex={1}>
      <Flex flex={1} flexDirection="column">
        <Flex
          height={"18px"}
          backgroundColor="#f0f0f0"
          flexDirection="row"
          alignItems="center"
          paddingLeft={1}
          paddingRight={1}
          paddingBottom={0}
          borderBottomStyle="solid"
          borderColor="#808080"
          borderBottomWidth="1px"
        >
          <Flex flexDirection="row" alignItems="center" px={2}>
            <div className="large-screen-only">
              <Text fontSize="9px" color="#ff4500" fontWeight={700}>
                BROWSE BY MONTH
              </Text>
              <Text fontSize="9px" color="#000" marginLeft={5}>
                -
              </Text>
            </div>

            {months.map(({ name, value }, index) => (
              <Flex alignItems="center" key={name}>
                <Link href={`/month/${value}`}>
                  <a className="month-option">{`${name.toUpperCase()}`}</a>
                </Link>
                <span>{`${index !== months.length - 1 ? " - " : ""} `}</span>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex
          height={45}
          px={4}
          pt={4}
          borderBottom="1px solid"
          borderBottomColor="#5f99cf"
          flexDirection="row"
          alignItems="flex-end"
          backgroundColor="#cee3f8"
        >
          <Flex
            alignItems="flex-start"
            justifyContent="flex-end"
            pr={10}
            style={{ cursor: "pointer" }}
          >
            <Link href="/month/1">
              <Flex alignItems="flex-start" marginRight={20}>
                <h1
                  style={{
                    fontSize: 14,
                    fontFamily: "monospace",
                    padding: "0 2px 0 2px",
                    fontWeight: 400,
                    fontStyle: "italic",
                    margin: "0 0 5px 0",
                  }}
                >
                  {"> a year in review for reddit [2020]"}
                </h1>
              </Flex>
            </Link>
          </Flex>
          <Flex>
            {tabs.map(({ name, route }) => (
              <Tab active={name === activePage} label={name} route={route} key={name} />
            ))}
          </Flex>
        </Flex>
      </Flex>
      <style jsx>
        {`
          a.month-option {
            font-family: Verdana, arial, helvetica, sans-serif;
            font-size: 9px;
            color: #000;
            font-weight: 400;
            text-decoration: none;
            margin-right: 5px;
            margin-left: 5px;
          }
          a.month-option:hover {
            text-decoration: underline;
          }
          .large-screen-only {
            display: flex;
          }

          @media (max-width: 768px) {
            .large-screen-only {
              display: none;
            }
          }
        `}
      </style>
    </Flex>
  );
};

export default NavBar;
