import styled from "styled-components";

export const ProjectsData = styled.div`
    height: 100%;
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
