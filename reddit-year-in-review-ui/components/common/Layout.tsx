import { useContext } from "react";
import Switch from "react-switch";

import { Box, Flex, Text, Link } from ".";
import { ThemeContext } from "../../contexts";

const NavBar = () => {
  return (
    <Flex
      height={35}
      p={2}
      borderBottom="1px solid"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Text>a year in review for reddit (not afiliated with reddit)</Text>
      <input
        placeholder="Search"
        style={{ display: "flex", flex: 1, marginLeft: 15, marginRight: 35 }}
      />
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

const FilterOptoinsBar = () => {
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

const Layout = ({ children }) => {
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
      <FilterOptoinsBar />
      {children}
    </Box>
  );
};

export default Layout;
