import styled from "styled-components";

export const StandartInput = styled.input<{marginDensitive?: boolean}>`
    width: 200px;
    height: 25px;
    border-radius: 12.5px;
    background-color: white;
    text-decoration: none;
    border: none;
    font-style: italic;
    padding-left: 5px;
    margin-bottom: ${p => p.marginDensitive ? '7' : '14'}px;
`;