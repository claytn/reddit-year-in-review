import NavBar from "components/NavBar";
import { Box, Flex, Text, Link } from ".";

const Layout: React.FC = ({ children }) => {
  return (
    <Box height="100vh" bg="bg">
      <NavBar />
      {children}
    </Box>
  );
};

export default Layout;
