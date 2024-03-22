import styled, { css } from "styled-components";
import { purpleMainColor } from "../../Tokens";

export const Wrapper = styled.div<{
  $transparent?: boolean,
  $white?: boolean,
  $rounded?: boolean,
  height?: string,
  $smallMargins?: boolean,
  $fullWidth: boolean,
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${p => p.height ?? '80px'};
  margin: 10px;
  background-color: ${(p) => ((p.$transparent && 'transparent') || (p.$white ? "white" : purpleMainColor))};
  border-radius: ${(p) => p.$rounded && "20px"};
  position: relative;
  width: ${p => p.$fullWidth ? '100%' : '80%'};
  margin-left: ${p => p.$smallMargins ? '20px' : 'auto'};
  margin-right: ${p => p.$smallMargins ? '20px' : 'auto'};

  @media (max-width: 920px) {
    height: ${p => p.height ?? 'auto'};
    width: auto;
    margin-left: 30px;
    margin-right: 30px;
  };
`;
