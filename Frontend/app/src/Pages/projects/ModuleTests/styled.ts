import styled from "styled-components";
import { SimpleWidget } from "~/src/UI-shared/Organisms/Widgets/SimpleWidget";
import { Wrapper } from "~/src/UI-shared/Organisms/Widgets/styled";

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
    width: 15px;
`;