import { useEffect } from 'react';
import WikiBanner from '~/src/Components/Banners';
import * as ST from './styled';
import { BreakLineWithButtons, BreakLineWithContacts } from '~/src/Components/BreakLine/BreakLineWithButtons';
import SliderList from '~/src/Components/Slider/SliderList';
import { useState } from 'react';
import AuthPopup from '~/src/Components/Authorization/AuthPopup';
import RegisterPopup from '~/src/Components/Authorization/RegisterPopup';
import { getCookie } from '~/src/helpers';

const MainPage = (): JSX.Element => {
    const [isAuthPopupOpen, updateIsAuthPopupOpen] = useState(false);
    const [isRegisterPopupOpen, updateIsRegisterPopupOpen] = useState(false);
    const [lkStatus, updateLkStatus] = useState('');
    const accessToken = getCookie('access_token');
    useEffect(() => {
        if (accessToken && accessToken?.length > 0) {
            updateLkStatus('Вы в авторизованной зоне');
            return;
        } else {
            updateLkStatus('Вы в неавторизованной зоне');
        }
    }, []);
    return (
        <ST.PageContainer className='page_container'>
            {lkStatus}
            <AuthPopup isOpen={isAuthPopupOpen} close={() => updateIsAuthPopupOpen(false)}/>
            <RegisterPopup isOpen={isRegisterPopupOpen} close={() => updateIsRegisterPopupOpen(false)}/>
            <h1>Main page</h1> 
            <WikiBanner/>
            <BreakLineWithButtons
                openAuthPopup={updateIsAuthPopupOpen}
                openRegisterPopup={updateIsRegisterPopupOpen}
            />
            <p>Добро пожаловать на Wikiarea</p>
            <BreakLineWithContacts/>
            <p>Платформа Wikiarea - ваш главный инструмент</p>
            <SliderList/>
            <BreakLineWithContacts/>
        </ST.PageContainer>
    );
};

export default MainPage;
