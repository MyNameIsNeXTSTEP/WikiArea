import { useEffect } from 'react';
import WikiBanner from '~/src/Components/Banners';
import * as ST from './styled';
import { BreakLineWithButtons, BreakLineWithContacts } from '~/src/Components/BreakLine/BreakLineWithButtons';
import SliderList from '~/src/Components/Slider/SliderList';
import { useState } from 'react';
import AuthPopup from '~/src/Components/Authorization/AuthPopup';
import RegisterPopup from '~/src/Components/Authorization/RegisterPopup';
import { useDispatch } from 'react-redux';
import APIRequest from '@api-package/index';
import { setUsersData } from '~/src/features/store/users';
import { TRequestMethod } from '@api-package/types';

const MainPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isAuthPopupOpen, updateIsAuthPopupOpen] = useState(false);
    const [isRegisterPopupOpen, updateIsRegisterPopupOpen] = useState(false);
    const getAllUsers = async () => {
        const res = await new APIRequest({
            uri: '/api/users/get-all',
            method: TRequestMethod.GET,
        }).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            const set = res.payload.map(user => ({
                role: user.role,
                email: user.email,
                login: user.login,
            }));
            dispatch(setUsersData(set))
        }
    };
    useEffect(() => {
        localStorage.clear();
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        (async () => await getAllUsers())();
    }, []);

    return (
        <ST.PageContainer className='page_container'>
            <AuthPopup isOpen={isAuthPopupOpen} close={() => updateIsAuthPopupOpen(false)}/>
            <RegisterPopup isOpen={isRegisterPopupOpen} close={() => updateIsRegisterPopupOpen(false)}/>
            <WikiBanner/>
            <BreakLineWithButtons
                openAuthPopup={updateIsAuthPopupOpen}
                openRegisterPopup={updateIsRegisterPopupOpen}
            />
                <a id="main-description"></a>
                <p>Добро пожаловать на WikiArea – вашу платформу для управления образовательными проектами!</p><br/>
                <p>Простота использования, мощные функциональные возможности и инновационные подходы делают WikiArea идеальным выбором для обучения и преподавания.</p>
            <BreakLineWithContacts/>
                <p>Платформа WikiArea - ваш главный инструмент для эффективного управления образовательными проектами!</p>
                <p style={{ marginBottom: '60px' }}>Почему именно наша платформа подходит лучше всего:</p>
            <SliderList/>
            <BreakLineWithContacts/>
        </ST.PageContainer>
    );
};

export default MainPage;
