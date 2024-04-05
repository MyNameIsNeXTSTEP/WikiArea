import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { Right, Left } from "~/src/UI-shared/Atoms/Containers/index";
import ProfileLogo from "~/src/assets/svg/Profile.svg";
import { ProfileBlock, ProfileImage } from "./styled";
// import { ReactNode, useState } from "react";
// import { useSelector } from "react-redux";
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import WidgetsBlock from "./WidgetsBlock";
import AdditionalDataControl from "./AdditionalDataControl";
import { Title } from "~/src/UI-shared/Tokens";
import { useState } from "react";
import StandartPopupWithContent from "../Popup/StandartPopupWithContent";
import { useSelector } from "react-redux";
import Menu from '~/src/UI-shared/Organisms/Menu/index.js';
import { getCookie } from "~/src/helpers";

const Profile = (): JSX.Element => {
  const accessToken = getCookie('access_token');
  console.log(accessToken);
  const { login, role } = useSelector(state => state.profile.auth);
  console.log(login, role);
  const [isProifleDeletionPopupOpen, updateOpenStatus] = useState(false);
  if (!accessToken || accessToken.length < 0 || !role) {
    return <>
      <h1>Ошибка</h1>
      <h2>Вы не авторизованы</h2>
      <h2>Пожалуйста зарегистрируйтесь и войдите в личный кабинет</h2>
    </>
  };
  return (
    <>
      <Menu/>
      <Title style={{ textAlign: 'start', marginLeft: '150px' }}>Личные данные</Title>
      <WidgetWith2Items $rounded>
        <Left className="left">
          <ProfileBlock className="profile-block">
            <ProfileImage src={ProfileLogo} />
            {login}
          </ProfileBlock>
        </Left>
        <Right className="right">
          <StandartButton
            $white
            className="delete-button"
            onClick={() => updateOpenStatus(!isProifleDeletionPopupOpen)}
          >
            Удалить
          </StandartButton>
        </Right>
      </WidgetWith2Items>
      <WidgetsBlock/>
      {/* @todo: Condition: if teacher or student */}
      <AdditionalDataControl/>
        <StandartPopupWithContent
          isOpen={isProifleDeletionPopupOpen}
          updateIsOpen={updateOpenStatus}
          text='Вы действительно хотите удалить свой профиль'
          firstBtn='Удалить'
        />
    </>
  );
};

export default Profile;
