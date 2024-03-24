import * as ST from './styled';
import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import { useEffect, useRef, useState } from "react";

const ChatPage = (): JSX.Element => {
    const [messages, updateMessages] = useState<object[]>([]);
    const messageInputRef = useRef<HTMLInputElement>(null);
    const getMessages = async () => {
        const request = {
            uri: '/api/messages',
            method: TRequestMethod.GET
        };
        const messages = await new APIRequest(request).doRequest();
        updateMessages(messages)
        console.log(messages);
    };
    const sendMessage = async () => {
        const messageText = messageInputRef.current?.value;
        // Example data, replace with actual user input and authentication
        const messageData = { role: 'student', text: messageText, user_login: 'user123' };
        const request = {
            uri: '/api/messages',
            method: TRequestMethod.POST,
            body: JSON.stringify(messageData),
        };
        await new APIRequest(request).doRequest();
        if (messageInputRef.current) { messageInputRef.current.value = '' }
        getMessages();
    };
    useEffect(() => {
        getMessages();
    }, []);

    return <>
        {/* <h2>Chat</h2>
        <input type="text" id="messageInput" placeholder="Write a message..." ref={messageInputRef}/>
        <button onClick={sendMessage}>Send</button> */}
        {/* { messages.map(el => {
                <div id="messages" dangerouslySetInnerHTML={{ __html: messages }}></div>
            })
        } */}
        <ST.Container id='chat-container'>
            <ST.UsersList id='chat-user-list'>
                <ST.User id='chat-user'></ST.User>
            </ST.UsersList>
            <ST.ChatMessagesArea id='chat-message-area'>
                <ST.Message></ST.Message>
                <ST.Input id='chat-input'></ST.Input>
            </ST.ChatMessagesArea>
        </ST.Container>
    </>
};

export default ChatPage;