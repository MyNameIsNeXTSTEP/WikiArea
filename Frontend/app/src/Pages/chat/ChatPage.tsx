import * as ST from './styled';
import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';

const ChatPage = (): JSX.Element => {
    const {
        auth: { role, login },
        users: { users },
    } = useSelector(state => ({
        auth: state.profile.auth,
        users: state.users,
    }));
    const [messages, updateMessages] = useState<Array<Record<string, string>>>([]);
    const [companionLogin, setIsCompanionLogin] = useState(users[0].login);
    const messageInputRef = useRef<HTMLInputElement>(null);
    const getMessages = async () => {
        const request = {
            uri: '/api/messages',
            method: TRequestMethod.GET,
            queryParams: {
                companionLogin
            },
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
            const messageData = {
                role,
                text: messageText,
                user_login: login,
                companionLogin,
            };
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
    }, [companionLogin]);

    useEffect(() => {
        setTimeout(() => {
            const element = document.getElementById('messages-list');
            if (element) {
                console.log(element)
                element.scroll({ top: element.scrollHeight, behavior: 'smooth'});
            }
        }, 100);
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
    console.log(messages);

    return <>
        <ST.Container id='chat-container'>
            <ST.UsersList id='chat-user-list'>
                { users.map(u => {
                    if (u.login === login) return // don't show current user
                    return <ST.User 
                        key={u.login}
                        $isActive={companionLogin === u.login}
                        onClick={() => setIsCompanionLogin(u.login)}
                        className='chat-user'
                    >
                        {u.login}
                    </ST.User>
                })}
            </ST.UsersList>
            <ST.ChatMessagesArea id='chat-message-area'>
                <ST.Messages id='messages-list'>
                    { messages.length && messages.map(msg => {
                        return <ST.Message $my={msg.user_login === login} $rounded id='chat-message'>
                            <ST.LeftTop>
                                <p>{msg.user_login === login ? 'Вы' : msg.user_login}:</p>
                                <p>{msg.text}</p>
                            </ST.LeftTop>
                            <ST.RightBottom style={{ position: 'absolute', bottom: 0, right: 0 }}>
                                <ST.Datetime>{getFormattedDate(msg.date)}</ST.Datetime>
                            </ST.RightBottom>
                        </ST.Message>})
                    }
                </ST.Messages>
                <ST.Input
                    id='chat-input'
                    onKeyDown={e => sendMessage(e)}
                    placeholder='Введите сообщение'
                    ref={messageInputRef}
                >
                </ST.Input>
            </ST.ChatMessagesArea>
        </ST.Container>
    </>
};

export default ChatPage;