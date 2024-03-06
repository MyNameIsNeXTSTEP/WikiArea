import WikiBanner from '~/src/Components/Banners';
import * as ST from './styled';
import { BreakLineWithButtons, BreakLineWithContacts } from '~/src/Components/BreakLine/BreakLineWithButtons';
import SliderList from '~/src/Components/Slider/SliderList';
import { useState } from 'react';
import AuthPopup from '~/src/Components/Popup/AuthPopup';

const MainPage = (): JSX.Element => {
    // const request = {
    //     uri: '/api/get-all-tasks',
    //     method: TRequestMethod.GET,
    //     headers: {}
    // };
    // const getTasks = useCallback(async () => {
    //     const res = await new APIRequest(request).doRequest();
    //     return res.isSuccess ? res.payload : null
    // }, []);
    const [isAuthPopupOpen, updateIsAuthPopupOpen] = useState(false)
    const [isRegisterPopupOpen, updateIsRegisterPopupOpen] = useState(false)

    return (
        <ST.PageContainer className='page_container'>
            <AuthPopup isOpen={isAuthPopupOpen} close={() => updateIsAuthPopupOpen(false)}/>
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
            {/* <RegisterPopup isOpen={isRegisterPopupOpen}/> */}
        </ST.PageContainer>
    );
};

export default MainPage;
