import styled from "styled-components";

export const Banner = styled.div<{width?: number, height?: number}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${p => p.width ?? '70%'};
    height: ${ p => p.height ?? '400px'};
    margin: 10px;
    border-radius: 10px;
    background-color: white;
`;