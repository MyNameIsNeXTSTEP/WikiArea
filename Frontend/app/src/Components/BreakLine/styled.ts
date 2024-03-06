import styled from "styled-components";
import { purpleMainColor } from '~/src/UI-shared/Tokens';

export const Button = styled.button<{$purple?: boolean}>`
    display: flex;
    align-items: center;
    height: 30px;
    border-radius: 7px;
    width: fit-content;
    padding: 7px;
    margin-left: 20px;
    border: 2px solid ${purpleMainColor};
    cursor: pointer;
    ${p => `background-color: ${p.$purple ? purpleMainColor : 'white' }`};
`;

export const Left = styled.span`
    position: relative;
    float: left;
    margin-left: auto;
    width: fit-content;
    margin-left: 20px;
`;

export const Right = styled.span`
    position: relative;
    float: right;
    width: fit-content;
    margin-right: 20px;
`;

export const ButtonRow = styled.span`
    display: flex;
    width: fit-content;
    flex-direction: row;
`;