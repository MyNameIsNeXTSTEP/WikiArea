import styled from "styled-components";
import { purpleMainColor } from '~/src/UI-shared/Tokens';
export { Left, Right, ButtonRow } from '~/src/UI-shared/Atoms/Containers';

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
