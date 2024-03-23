import styled from "styled-components";
import { purpleMainColor } from "../../Tokens";

export const Breakline = styled.div<{
  $white?: boolean;
  $rounded?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  margin: 10px;
  background-color: ${p => p.$white ? "white" : purpleMainColor};
  border-radius: ${(p) => p.$rounded && "20px"};
`;
