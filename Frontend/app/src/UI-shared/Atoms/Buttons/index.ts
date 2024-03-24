import styled, { css } from "styled-components";
import { purpleMainColor } from "../../Tokens";

export const StandartButton = styled.button<{ $white?: boolean, $bordered?: boolean, $whiteBordered?: boolean, $width?: string }>`
  width: ${p => p.$width ?? '130px'};
  height: 30px;
  text-align: center;
  background-color: ${p => p.$white ? "white" : purpleMainColor};
  border-radius: 15px;
  text-decoration: none;
  border: ${p => p.$whiteBordered
    ? css`2px solid white`
    : p.$bordered
      ? css`2px solid ${purpleMainColor}`
      : 'none'
  };
  font-size: larger;
  color: ${p => p.$white ? purpleMainColor : 'white'};
  cursor: pointer;
  &:active {
    transform: scale(0.9);
  }
`;