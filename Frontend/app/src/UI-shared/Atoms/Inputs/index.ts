import styled from "styled-components";
import { purpleMainColor } from "../../Tokens";

export const StandartInput = styled.input<{marginDensitive?: boolean, $bordered?: boolean }>`
    width: 200px;
    height: 25px;
    border-radius: 12.5px;
    background-color: white;
    text-decoration: none;
    border: ${p => p.$bordered ? `2px solid ${purpleMainColor}` : 'none'};
    font-style: italic;
    padding-left: 5px;
    margin-bottom: ${p => p.marginDensitive ? '7' : '14'}px;
    &:focus {
        outline: none;    
    }
`;

export const RawInput = styled.input`
    align-self: flex-start;
    width: 95%;
    height: 25px;
    background-color: transparent;
    border: none;
    text-decoration: none;
    font-style: italic;
    padding-left: 5px;
    &:focus {
        outline: none;    
    }
`;