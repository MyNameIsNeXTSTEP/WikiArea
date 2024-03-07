import { Breakline } from '~/src/UI-shared/Organisms/BreakLine/styled';
import * as ST from './styled';
import { Dispatch, SetStateAction } from 'react';

interface IButtonProps {
    openAuthPopup: Dispatch<SetStateAction<boolean>>,
    openRegisterPopup: Dispatch<SetStateAction<boolean>>,
}

export const BreakLineWithButtons = ({ openAuthPopup, openRegisterPopup }: IButtonProps): JSX.Element => {
    const openCurrent = (conf: boolean[]) => {
        openAuthPopup(conf[0]);
        openRegisterPopup(conf[1]);
    }
    return <Breakline>
        <ST.Left>
            <strong>Wikiarea</strong>
        </ST.Left>
        <ST.Right>
            <ST.ButtonRow>
                <ST.Button onClick={() => openCurrent([true, false])}>Войти</ST.Button>
                <ST.Button onClick={() => openCurrent([false, true])} $purple>Регистрация</ST.Button>
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
