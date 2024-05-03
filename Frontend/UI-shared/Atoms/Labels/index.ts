import styled, { css } from "styled-components";
import { purpleMainColor } from "../../Tokens";

export const StandartLabel = styled.label<{ $white?: boolean, $bordered?: boolean, $whiteBordered?: boolean }>`
    font-size: large;
    font-weight: 500;
    color: ${p => p.$white ? 'white' : purpleMainColor};
    border: ${p => p.$whiteBordered
        ? css`2px solid white`
        : p.$bordered
            ? css`2px solid ${purpleMainColor}`
            : 'none'
    };
    border-radius: 15px;
    height: 30px;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
`;