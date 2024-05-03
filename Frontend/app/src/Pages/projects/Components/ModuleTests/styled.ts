import styled from "styled-components";
import { SimpleWidget } from "@ui/Organisms/Widgets/SimpleWidget";
import { Wrapper } from "@ui/Organisms/Widgets/styled";
import { purpleMainColor } from "@ui/Tokens";

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    margin: auto;
    .tests-row {
        flex: 50%;
    }
`;

export const TestsWidgets = styled(Wrapper)`
    height: auto;
`;

export const TestSimpleWidget = styled(SimpleWidget)`
    align-items: flex-start;
    padding: 20px;
    height: fit-content;
`;

export const TestText = styled.p`
    font-weight: 400;
    font-size: larger;
    color: white;
`;

export const RadioSelector = styled.input`
    align-self: center;
    appearance: none;
    accent-color: ${purpleMainColor};
    outline-color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-clip: content-box;
    border: 2px solid white;
    background-color: white;
    &:checked {
        background-color: ${purpleMainColor};
        padding: 4px;
    }
`;