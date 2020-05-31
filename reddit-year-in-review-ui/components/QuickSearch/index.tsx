import React from "react";
import { Flex } from "components/common";

const QuickSearch: React.FC = ({ ...props }) => (
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
