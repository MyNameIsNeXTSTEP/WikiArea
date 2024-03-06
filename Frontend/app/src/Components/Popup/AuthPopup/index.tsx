import { useRef } from 'react';
import * as ST from './styled';
import APIRequest from '@api-package/index';

import { TRequestMethod } from '@api-package/types';
import { StandartInput } from "~/src/UI-shared/Atoms/Inputs";
import DefaultPopup from "../DefaultPopup";
import Captcha from "~/src/UI-shared/Organisms/Captha";
import { getCookie } from '~/src/helpers';

interface IProps {
    isOpen: boolean,
    close: () => void,
};

const AuthPopup = ({ isOpen, close }: IProps): JSX.Element | null => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const accessToken = getCookie('access_token') || '';
    console.log(accessToken);
    const request = {
        uri: '/api/auth',
        method: TRequestMethod.POST,
        headers: {
            'X-Auth-Token': accessToken
        },
        body: JSON.stringify({
            email: email.current?.value,
            password: password.current?.value
        })
    };
    const submitAuth = async () => {
        const res = await new APIRequest(request).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            const { accessToken } = res.payload.body;
            document.cookie = `access_token=${accessToken}; path=/; max-age=${60 * 60 * 5}` // for 2 hours
            return;
        }
        alert('Auth error');
    };

    return isOpen
        ? <DefaultPopup>
            <ST.Cancel size={20} color={'white'} onClick={close}/>
            <ST.Title>Вход</ST.Title>
            <StandartInput ref={email} placeholder="Введите email..." />
            <StandartInput ref={password} placeholder="Введите пароль..."/>
            <Captcha onSuccess={submitAuth}/>
        </DefaultPopup>
        : null;
};

export default AuthPopup;