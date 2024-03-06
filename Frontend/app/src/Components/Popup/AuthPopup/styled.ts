import styled from "styled-components";
import CancelIcon from "~/src/assets/svg/Cancel";

export const Title = styled.h2`
    color: white;
    text-decoration: underline;
    font-style: italic;
`;

export const Cancel = styled(CancelIcon)`
    align-self: flex-end;
    top: 0;
    right: 0;
    position: absolute;
    margin-top: 5px;
    margin-right: 5px;
    cursor: pointer;
`;