import { Flex } from "../common";

const QuickSearch = ({ ...props }) => (
  <Flex
    height={"100px"}
    color="text"
    bg="bg"
    border="1px solid"
    borderColor="secondary"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    {...props}
  >
    <input type="date" />
    <button>Quick Search</button>
  </Flex>
);

export default QuickSearch;
