import { useContext } from "react";
import Switch from "react-switch";

import { Box, Flex, Text, Link } from ".";
import { ThemeContext } from "../../contexts";

const NavBar = () => {
  return (
    <Flex height={40} p={2} flexDirection="row" justifyContent="space-between">
      <Text>a year in review for reddit (not afiliated with reddit)</Text>
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

const Layout = ({ breakpoint, renderMobile, renderDesktop, children }) => {
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

  const [alternateThemeOn, toggleTheme] = useContext(ThemeContext);

  return (
    <Box height="100vh" bg="bg">
      <NavBar />
      <Flex flexDirection="row" justifyContent="flex-end" px={4}>
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
      {children}
    </Box>
  );
};

export default Layout;
