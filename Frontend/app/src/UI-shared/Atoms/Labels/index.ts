import styled from "styled-components";
import { purpleMainColor } from "../../Tokens";

export const StandartLabel = styled.label<{ $white?: boolean }>`
    font-size: large;
    font-weight: 500;
    color: ${p => p.$white ? 'white' : purpleMainColor};
`;