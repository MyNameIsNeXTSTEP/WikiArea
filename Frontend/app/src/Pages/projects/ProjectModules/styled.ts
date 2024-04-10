import styled from "styled-components";
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { ButtonRow, Left, Right } from "~/src/UI-shared/Atoms/Containers";
import { StandartInput } from "~/src/UI-shared/Atoms/Inputs";
import { Title } from "~/src/UI-shared/Tokens";

export const ModuleInput = styled(StandartInput)<{$noShifts?: boolean}>`
    position: absolute;
    left: ${p => !p.$noShifts ? 0 : 'unset'};
    margin-left: ${p => !p.$noShifts ? '50px' : 'unset'};
`;

export const TaskMaterialsInput = styled(StandartInput)<{$noShifts?: boolean}>`
    position: absolute;
    left: ${p => !p.$noShifts ? 0 : 'unset'};
    margin-left: ${p => !p.$noShifts ? '50px' : 'unset'};
    border-radius: 20px;
    margin-top: 10px;
    top: 0;
`;

export const ButtonsLeft = styled(Left)`
    position: absolute;
    right: 230px;
    margin-bottom: 30px;
`;

export const ButtonsRight = styled(Right)`
    position: absolute;
    right: 230px;
`;

export const StyledButtonRow1 = styled(ButtonRow)`
    width: 400px;
`;

export const StyledButtonRow2 = styled(ButtonRow)`
    width: 440px;
`;

export const StyledTtitle = styled(Title)`
    width: fit-content;
    margin-left: 20px;
`;

export const TaskMaterialsDeleteButton = styled(StandartButton)`
    height: 30px;
    margin-right: 15px;
    align-self: flex-end;
`;

export const PlainFlexContainer = styled.div`
    display: flex;
    position: absolute;
    width: 100%;
    height: fit-content;
    bottom: 0;
`;

export const AddTaskModuleText = styled.textarea`
    width: 80% !important;
    height: 100px !important;
    padding: 10px;
    border-radius: 20px !important;
    border: none !important;
    outline: none;
    background: white;
`