import { useRef } from 'react';
import * as ST from '../../Popup/styled';
import APIRequest from '@api-package/index';

import { TRequestMethod } from '@api-package/types';
import { StandartInput } from "~/src/UI-shared/Atoms/Inputs";
import DefaultPopup from "../../Popup/DefaultPopup";
import Captcha from "~/src/UI-shared/Organisms/Captha";
import { getCookie } from '~/src/helpers';
import { useDispatch } from 'react-redux';
import { setProfileData } from '~/src/features/store/profile';

interface IProps {
    isOpen: boolean,
    close: () => void,
};

const AuthPopup = ({ isOpen, close }: IProps): JSX.Element | null => {
    const dispatch = useDispatch();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const accessToken = getCookie('access_token');
    const request = {
        uri: '/api/auth',
        method: TRequestMethod.POST,
        body: JSON.stringify({
            email: emailRef.current?.value,
            password: passwordRef.current?.value
        }),
        headers: {
            'X-Auth-Token': 'empty',
        }
    };
    
    if (accessToken && accessToken !== String(undefined) && accessToken?.length > 0) {
        // @ts-ignore
        request.headers = {
            'X-Auth-Token': accessToken
        };
    };
    
    const submitAuth = async () => {
        console.log(emailRef.current?.value);
        const res = await new APIRequest(request).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            const { accessToken, email, login, role } = res.payload.body;
            document.cookie = `access_token=${accessToken}; path=/; max-age=${60 * 60 * 5}` // for 2 hours
            dispatch(setProfileData({
                accessToken,
                email,
                login,
                role,
            }))
            return;
        }
        alert('Auth error');
    };

    return isOpen
        ? <DefaultPopup>
            <ST.Cancel size={20} color={'white'} onClick={close}/>
            <ST.Title>Вход</ST.Title>
            <StandartInput ref={emailRef} placeholder="Введите email..." />
            <StandartInput ref={passwordRef} placeholder="Введите пароль..."/>
            <Captcha onSuccess={submitAuth}/>
        </DefaultPopup>
        : null;
};

export default AuthPopup;