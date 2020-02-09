import { Box, Flex, Text, Link } from "./common";

const NavBar = () => {
  return (
    <Flex height={"30px"} flexDirection="row" justifyContent="space-between">
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

  return (
    <Box height="100vh" bg="bg">
      <NavBar />
      {children}
    </Box>
  );
};

export default Layout;
