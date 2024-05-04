import * as ST from "./styled";
import WikiareaSmall from './Wikiarea-small.png';
import { Breakline } from "@ui/Organisms/BreakLine/styled";
import { Dispatch, SetStateAction } from "react";

interface IButtonProps {
  openAuthPopup: Dispatch<SetStateAction<boolean>>;
  openRegisterPopup: Dispatch<SetStateAction<boolean>>;
}

export const BreakLineWithButtons = ({
  openAuthPopup,
  openRegisterPopup,
}: IButtonProps): JSX.Element => {
  const openCurrent = (conf: boolean[]) => {
    openAuthPopup(conf[0]);
    openRegisterPopup(conf[1]);
  };
  return (
    <Breakline $white style={{ marginBottom: '60px', marginTop: '60px' }}>
      <ST.Left>
        <img src={WikiareaSmall} style={{ width: '200px' }}/>
      </ST.Left>
      <ST.Right>
        <ST.ButtonRow>
          <ST.Button onClick={() => openCurrent([true, false])}>
            Войти
          </ST.Button>
          <ST.Button onClick={() => openCurrent([false, true])} $purple>
            Регистрация
          </ST.Button>
        </ST.ButtonRow>
      </ST.Right>
    </Breakline>
  );
};

export const BreakLineWithContacts = (): JSX.Element => {
  return (
    <Breakline $white style={{ marginBottom: '60px', marginTop: '60px' }}>
      <ST.Left>
        <img src={WikiareaSmall} style={{ width: '200px' }}/>
      </ST.Left>
      <ST.Right>
        <p>Contacts</p>
      </ST.Right>
    </Breakline>
  );
};
