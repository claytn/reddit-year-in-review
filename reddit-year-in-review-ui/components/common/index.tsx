import styled from "styled-components";
import { space, layout, color, flexbox, typography, border } from "styled-system";

export const Box = styled.div`
  ${space}
  ${layout}
  ${color}
  ${border}
`;

export const Flex = styled(Box)`
  display: flex;
  ${flexbox}
`;

export const Text = styled(Flex)`
  font-family: Verdana, arial, helvetica, sans-serif;
  ${typography}
  ${space}
`;

export const Image = styled.img`
  ${border}
  ${space}
  ${layout}
`;
