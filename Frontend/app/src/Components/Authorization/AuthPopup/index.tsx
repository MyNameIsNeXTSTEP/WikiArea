import { useCallback, useEffect, useMemo, useState } from 'react';
import * as ST from '../../Popup/styled';
import APIRequest from '@api-package/index';
import { TRequestMethod } from '@api-package/types';
import { StandartInput } from "~/src/UI-shared/Atoms/Inputs";
import DefaultPopup from "../../Popup/DefaultPopup";
import Captcha from "~/src/UI-shared/Organisms/Captha";
import { getCookie } from '~/src/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData } from '~/src/features/store/profile';
import { useNavigate } from 'react-router-dom';

interface IProps {
    isOpen: boolean,
    close: () => void,
};

const AuthPopup = ({ isOpen, close }: IProps): JSX.Element | null => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userPageRole = useSelector(state => state.profile.auth.role);
    const [redirectToUserPage, setRedirectToUserPage] = useState(false);
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const accessToken = getCookie('access_token');
    
    const submitAuth = async () => {
        const request = {
            uri: '/api/auth',
            method: TRequestMethod.POST,
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'X-Auth-Token': 'empty', // @todo: Handle the token header properly for the actual empty string
            }
        };
    
        if (accessToken && accessToken !== String(undefined) && accessToken?.length > 0) {
            request.headers = {
                'X-Auth-Token': accessToken
            };
        };

        const res = await new APIRequest(request).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            const { body } = res.payload;
            document.cookie = `access_token=${body.accessToken}; path=/; max-age=${60 * 60 * 5}`; // for 2 hours
            dispatch(setProfileData(body));
            setRedirectToUserPage(true);
            return;
        }
        alert('Auth error');
    };

    useEffect(() => {
        if (redirectToUserPage) navigate(`/user/${userPageRole}`);
    }, [redirectToUserPage])

    return isOpen
        ? <DefaultPopup>
            <ST.Cancel size={20} color={'white'} onClick={close} />
            <ST.Title>Вход</ST.Title>
            <StandartInput
                placeholder="Введите email..."
                onChange={(e) => updateEmail(e.target.value)} />
            <StandartInput
                placeholder="Введите пароль..."
                onChange={(e) => updatePassword(e.target.value)} />
            <Captcha onSuccess={submitAuth} />
        </DefaultPopup>
        : null;
};

export default AuthPopup;