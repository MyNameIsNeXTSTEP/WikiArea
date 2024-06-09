import styled from "styled-components";
import { purpleMainColor } from "@ui/Tokens";
import { Left, Right } from "@ui/Atoms/Containers";

export const Container = styled.div`
    display: flex;
    height: calc(100vh - 100px);
    width: 100vw;
`;

export const Messages = styled.div`
    display: flex;
    flex-direction: column;
    overflow: scroll;
    overflow-x: hidden;
    height: 90%;
    width: 100%;
`;

export const Input = styled.input`
    height: 60px;
    width: 100%;
    padding: 10px;
    border: 4px solid ${purpleMainColor};
    outline: none;
`;

export const ChatMessagesArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
    border: 4px solid ${purpleMainColor};
    flex-grow: 1;
    flex: 3;
    height: 100%;
`;

export const Message = styled.div<{ $my?: boolean, $rounded?: boolean }>`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow-wrap: break-word;
    background-color: ${purpleMainColor};
    border-radius: ${(p) => p.$rounded && "20px"};
    width: 80%;
    min-height: 100px;
    height: auto;
    margin-left: ${p => p.$my ? 'auto' : '10px'} !important;
    margin-right: ${p => p.$my ? '10px' : 'auto'} !important;
    margin-bottom: 20px;
    margin-top: 20px;
`;

export const UsersList = styled.div`
    display: flex;
    flex-direction: column;
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
    cursor: pointer;
`;

export const Datetime = styled.p`
    font-size: small;
    font-weight: 300;
`;

export const RightBottom = styled(Right)`
    position: absolute;
    bottom: 0;
    right: 0;
`;

export const LeftTop = styled(Left)`
    position: absolute;
    top: 0;
    left: 0;
    text-align: start;
`;