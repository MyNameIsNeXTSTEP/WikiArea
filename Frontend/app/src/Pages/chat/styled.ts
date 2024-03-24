import styled from "styled-components";
import { purpleMainColor } from "~/src/UI-shared/Tokens";
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";

export const Container = styled.div`
    display: flex;
    height: calc(100vh - 100px);
    width: 100vw;
`;

export const Input = styled.input`
    height: 30px;
    width: 100%;
    border: 4px solid ${purpleMainColor};
    outline: none;
`;

export const ChatMessagesArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 4px solid ${purpleMainColor};
    flex-grow: 1;
    flex: 3;
    height: 100%;
`;

export const Message = styled(WidgetWith2Items)<{ $my?: boolean }>`
    right: ${p => p.$my ? 0 : 'auto'};
    margin-left: ${p => p.$my ? 'auto' : '0'};
    margin-right: ${p => p.$my ? '0' : 'auto'};
    margin-bottom: 20px;
    margin-top: 20px;
`;

export const UsersList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 100%;
    border: 2px solid ${purpleMainColor};
`;

export const User = styled.div<{ $isActive?: boolean }>`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: auto;
    padding: 5px;
    border: 4px solid ${purpleMainColor};
    background-color: ${p => p.$isActive ? purpleMainColor : 'white'};
`;