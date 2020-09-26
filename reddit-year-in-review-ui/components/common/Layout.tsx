import NavBar from "components/NavBar";
import { Box } from ".";
import { IPage } from "pages/types";

interface Props {
  page: IPage;
}

const Layout: React.FC<Props> = ({ page, children }) => {
  return (
    <Box height="100vh" bg="bg">
      <NavBar activePage={page} />
      {children}
    </Box>
  );
};

export default Layout;
