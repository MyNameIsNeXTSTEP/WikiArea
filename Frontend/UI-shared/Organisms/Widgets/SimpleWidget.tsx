import styled, { css } from "styled-components";
import { purpleMainColor } from "../../Tokens";

export const SimpleWidget = styled.div<{
  width?: string,
  height: string,
  $bordered?: boolean,
  $purple?: boolean,
  $autoMargins?: boolean,
  $relative?: boolean,
}>`
  display: flex;
  position: ${p => p.$relative && 'relative'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(p) => p.width ?? '80%'};
  height: ${(p) => p.height};
  margin: 10px;
  border-radius: 30px;
  border: ${p => p.$bordered ? css`3px solid ${purpleMainColor}` : 'none'};
  background-color: ${p => p.$purple ? purpleMainColor : 'white'};
  margin-right: ${p => p.$autoMargins && 'auto'};
  margin-left: ${p => p.$autoMargins && 'auto'};
`;
