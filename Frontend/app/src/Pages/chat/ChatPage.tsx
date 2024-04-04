import * as ST from './styled';
import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import { useEffect, useRef, useState } from "react";

const ChatPage = (): JSX.Element => {
    const [messages, updateMessages] = useState<Array<Record<string, string>>>([]);
    const messageInputRef = useRef<HTMLInputElement>(null);
    const getMessages = async () => {
        const request = {
            uri: '/api/messages',
            method: TRequestMethod.GET
        };
        const messages = await new APIRequest(request).doRequest();
        updateMessages(messages.payload)
    };
    const sendMessage = async (e) => {
        if (e.key === 'Enter') {
            const messageText = messageInputRef.current?.value;
            console.log(messageText);
            if (messageText === '') {
                return
            };
            const messageData = { role: 'student', text: messageText, user_login: 'user123' };
            const request = {
                uri: '/api/messages',
                method: TRequestMethod.POST,
                body: JSON.stringify(messageData),
            };
            await new APIRequest(request).doRequest();
            if (messageInputRef.current) { messageInputRef.current.value = '' }
            getMessages();
        }
    };

    useEffect(() => {
        getMessages();
    }, []);

    const getFormattedDate = (d) => {
        const date = new Date(d);
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
        let year = date.getFullYear().toString().slice(-2); // Get last 2 digits of year
    
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };
    const originUser = 'Вы';

    return <>
        {/* <h2>Chat</h2>
        <input type="text" id="messageInput" placeholder="Write a message..." ref={messageInputRef}/>
        <button onClick={sendMessage}>Send</button> */}
        <ST.Container id='chat-container'>
            <ST.UsersList id='chat-user-list'>
                <ST.User id='chat-user'></ST.User>
            </ST.UsersList>
            <ST.ChatMessagesArea id='chat-message-area'>
                { messages.length && messages.map(msg => {
                    return <ST.Message $my $rounded id='chat-message'>
                        <ST.LeftTop>
                            <p>{originUser}:</p>
                            <p>{msg.text}</p>
                        </ST.LeftTop>
                        <ST.RightBottom style={{ position: 'absolute', bottom: 0, right: 0 }}>
                            <ST.Datetime>{getFormattedDate(msg.date)}</ST.Datetime>
                        </ST.RightBottom>
                    </ST.Message>})
                }
                <ST.Input id='chat-input' onKeyDown={e => sendMessage(e)} placeholder='Введите сообщение' ref={messageInputRef}></ST.Input>
            </ST.ChatMessagesArea>
        </ST.Container>
    </>
};

export default ChatPage;