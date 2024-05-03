import styled from "styled-components";
import CancelIcon from "../../../../UI-shared/assets/components/Cancel";

export const Title = styled.h2`
    margin-bottom: 20px;
    color: white;
    text-decoration: underline;
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