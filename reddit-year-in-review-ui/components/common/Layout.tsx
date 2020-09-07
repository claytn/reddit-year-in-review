import { useContext } from "react";
import Switch from "react-switch";

import { Box, Flex, Text, Link } from ".";
import { ThemeContext } from "contexts";

const NavBar: React.FC = () => {
  return (
    <Flex
      height={45}
      px={1}
      pt={1}
      borderBottom="1px solid"
      flexDirection="row"
      justifyContent="space-between"
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
          a year in review for...
        </Text>
        <img src="/assets/reddit_logo.png" alt="reddit" width="80" height="28" />
      </Flex>

      <Flex>
        <Link href="about">
          <a>
            <Text>About</Text>
          </a>
        </Link>
        <Link href="/">
          <a style={{ marginLeft: 20 }}>
            <Text>Donate</Text>
          </a>
        </Link>
      </Flex>
    </Flex>
  );
};

const FilterOptoinsBar: React.FC = () => {
  const [alternateThemeOn, toggleTheme] = useContext(ThemeContext);
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      px={4}
      py={1}
      borderBottom={"1px solid"}
    >
      <Flex>
        Filter: <input />
      </Flex>

      <Switch
        onChange={toggleTheme}
        checked={alternateThemeOn}
        height={24}
        width={48}
        checkedIcon={<div></div>}
        uncheckedIcon={<div></div>}
        offColor={"#d9dfe2"}
        offHandleColor={"#fff"}
        onColor={"#999"}
        onHandleColor={"#282c35"}
      />
    </Flex>
  );
};

const Layout: React.FC = ({ children }) => {
  /* const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 
  (width > breakpoint ? renderDesktop() : renderMobile())
  */

  return (
    <Box height="100vh" bg="bg">
      <NavBar />
      {/* <FilterOptoinsBar /> */}
      {children}
    </Box>
  );
};

export default Layout;
