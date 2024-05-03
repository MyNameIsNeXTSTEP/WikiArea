import styled from "styled-components";
import { purpleMainColor } from "../../Tokens";

export const StandartInput = styled.input<{marginDensitive?: boolean, $bordered?: boolean, width?: string, height?: string }>`
    width: ${p => p.width ?? '200px'};
    height: ${p => p.height ?? '25px'};
    border-radius: 12.5px;
    background-color: white;
    text-decoration: none;
    border: ${p => p.$bordered ? `2px solid ${purpleMainColor}` : 'none'};
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
    padding-left: 5px;
    &:focus {
        outline: none;    
    }
`;

export const StandartDropdown = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 100px;
    margin-bottom: 10px;
    border-radius: 12.5px;
    text-decoration: none;
    padding-left: 5px;
`;

export const StandartDropdownOption = styled.div<{ height?: string, width?: string }>`
    display: block;
    padding: 5px;
    margin-bottom: 5px;
    width: ${p => p.width ?? '150px'};
    height: ${p => p.height ?? '25px'};
    border-radius: 12.5px;
    text-decoration: none;
    background: white;
    cursor: pointer;
    &:active {
        border: 2px solid white;
        background: ${purpleMainColor};
        color: white;
    }
`;