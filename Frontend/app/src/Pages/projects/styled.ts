import styled, { css } from "styled-components";

export const ImageBlock = styled.div<{ $abs?: boolean }>`
    display: flex;
    ${p => p.$abs && css`position: absolute`};
    width: 60px;
    margin-right: 20px;
    align-self: flex-start;
`;

export const ProjectsData = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    margin-left: 70px;
    align-self: center;
    padding: 10px;
    @media (max-width: 790px) {
        // 350px - edge case (do no need any valid styles, just ignore)
        flex-direction: column;
    }
`;
