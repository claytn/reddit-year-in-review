import { Flex } from "../common";

const QuickSearch = () => (
  <Flex
    m={2}
    width={[0.5]}
    color="text"
    bg="bg"
    border="1px solid"
    borderColor="secondary"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <input type="date" />
    <button>Quick Search</button>
  </Flex>
);

export default QuickSearch;
