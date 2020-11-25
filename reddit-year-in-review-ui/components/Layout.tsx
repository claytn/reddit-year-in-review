import NavBar from "components/NavBar";
import { Flex, Text } from "./common";
import { IPage } from "types";

interface Props {
  page: IPage;
  footer?: boolean;
}

const Layout: React.FC<Props> = ({ page, children, footer }) => {
  return (
    <Flex flex={1}>
      <Flex flex={1} flexDirection="column" bg="bg">
        <NavBar activePage={page} />
        {children}
        {footer && (
          <footer
            style={{
              flex: 1,
              marginTop: 20,
              padding: "20px 10px 20px 10px",
              borderTopWidth: 1,
              borderTopColor: "gray",
              borderTopStyle: "dotted",
            }}
          >
            <Text style={{ display: "inline-block" }} fontSize={12} color="#888">
              A year in review for reddit is a project made by{" "}
              <a href="https://claytn.dev" style={{ marginLeft: 4 }}>
                @claytn
              </a>
              . Source can be found here
              <a
                href=" https://github.com/claytn/reddit-year-in-review/"
                style={{ marginLeft: 4 }}
              >
                https://github.com/claytn/reddit-year-in-review/
              </a>
            </Text>
          </footer>
        )}
      </Flex>
    </Flex>
  );
};

export default Layout;
