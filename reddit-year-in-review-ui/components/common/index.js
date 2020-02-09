import styled from "styled-components";
import {
  space,
  layout,
  color,
  flexbox,
  typography,
  border
} from "styled-system";
import NextLink from "next/link";

export const Box = styled.div`
  ${space}
  ${layout}
  ${color}
  ${border}`;

export const Flex = styled(Box)`
  display: flex;
  ${flexbox}
`;

export const Text = styled(Flex)`
  ${typography}
  font-family: Verdana, arial, helvetica, sans-serif;
`;

export const Link = styled(NextLink)`
  ${space}
  ${layout}
`;
