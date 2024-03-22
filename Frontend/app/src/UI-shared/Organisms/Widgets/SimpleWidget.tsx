import styled, { css } from "styled-components";
import { purpleMainColor } from "../../Tokens";

export const SimpleWidget = styled.div<{ width: string; height: string, $bordered?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  margin: 10px;
  border-radius: 30px;
  border: ${p => p.$bordered ? css`3px solid ${purpleMainColor}` : 'none'};
  background-color: white;
`;
