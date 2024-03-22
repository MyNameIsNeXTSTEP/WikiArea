import styled from "styled-components";
import { purpleMainColor } from "../../Tokens";

export const Wrapper = styled.div<{ $transparent?: boolean, $white?: boolean, $rounded?: boolean, height?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${p => p.height ?? '80px'};
  margin: 10px;
  background-color: ${(p) => ((p.$transparent && 'transparent') || (p.$white ? "white" : purpleMainColor))};
  border-radius: ${(p) => p.$rounded && "20px"};
  position: relative;
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 920px) {
    height: ${p => p.height ?? 'auto'};
    width: auto;
    margin-left: 30px;
    margin-right: 30px;
  };
`;
