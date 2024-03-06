import { Breakline } from '~/src/UI-shared/Organisms/BreakLine/styled';
import * as ST from './styled';
import { Dispatch, SetStateAction } from 'react';

interface IButtonProps {
    openAuthPopup: Dispatch<SetStateAction<boolean>>,
    openRegisterPopup: Dispatch<SetStateAction<boolean>>,
}

export const BreakLineWithButtons = ({ openAuthPopup, openRegisterPopup }: IButtonProps): JSX.Element => {
    return <Breakline>
        <ST.Left>
            <strong>Wikiarea</strong>
        </ST.Left>
        <ST.Right>
            <ST.ButtonRow>
                <ST.Button onClick={() => openAuthPopup(true)}>Войти</ST.Button>
                <ST.Button onClick={() => openRegisterPopup(true)} $purple>Регистрация</ST.Button>
            </ST.ButtonRow>
        </ST.Right>
    </Breakline>
};

export const BreakLineWithContacts = (): JSX.Element => {
    return <Breakline>
        <ST.Left>
            <strong>Wikiarea</strong>
        </ST.Left>
        <ST.Right>
            <p>Contacts</p>
        </ST.Right>
    </Breakline>
};
