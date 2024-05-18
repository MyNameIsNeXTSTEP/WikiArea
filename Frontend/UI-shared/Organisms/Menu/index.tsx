import * as ST from "./styled";
import { useState } from "react";
import { ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { BackMenuBtn, ProfileImage } from "@ui/Atoms/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfileLogo, Back } from "@ui/assets/svg";
import { StandartButton } from "@ui/Atoms/Buttons";

interface IMenuItem {
  title: string;
  route: string;
  action?: () => void;
}

type TMenuButton = {
    id: number,
    onClick?: () => void,
    src?: string,
    props?: Record<string, string | number | boolean>,
    label?: string,
};

interface IProps {
  className?: string,
  onExit: () => void,
}

const Menu = ({ ...props }: IProps): JSX.Element => {
  const {
    menu: { buttons, isBackBtnDisabled, isMainMenu },
    role,
  } = useSelector(state => ({
      menu: state.menu,
      role: state.profile.auth.role,
  }));
  const [isOpen, openMenu] = useState(false);

  const menuDoubleItem = {
    titile: role !== 'admins' ? 'Проекты' : 'Пользователи',
    route: role !== 'admins' ? '/projects' : '/user/admins/manage-users'
  }
  const menuItems: IMenuItem[] = [
    { title: "Профиль", route: `/user/${role}` },
    { title: menuDoubleItem.titile, route: menuDoubleItem.route },
    { title: "Аналитика", route: "/analytics" },
    { title: "Чат", route: "/chat" },
    { title: "Выход", route: "/", action: props.onExit },
  ];
 
  return (
    <ST.Nav {...props}>
      <Left>Wikiarea</Left>
      <Right>
        {isMainMenu
            ? <ProfileImage src={ProfileLogo} onClick={() => openMenu(!isOpen)} />
            : <ButtonRow width="auto">
              { buttons[1] && <ButtonRow>
                    <StandartButton {...buttons[1].props} onClick={buttons[1].onClick}>
                        {buttons[1].label}
                    </StandartButton>
              </ButtonRow> }
              { !isBackBtnDisabled && <BackMenuBtn src={Back} onClick={buttons[0].onClick}/> }
            </ButtonRow>
        }
        { !isMainMenu && isBackBtnDisabled && buttons.length && <ButtonRow>
            {buttons.map((btn: TMenuButton) =>
                <StandartButton {...btn.props} onClick={btn.onClick}>
                    {btn.label}
                </StandartButton>
            )}
        </ButtonRow> }
      </Right>
      {isOpen && (
        <ST.ProfileMenu>
          <ST.MenuItemsList>
            <ST.IconBlock>
              <ST.Cancel size={40} color={"white"} onClick={() => openMenu(false)} />
            </ST.IconBlock>
            {menuItems.map((item: IMenuItem) => (
              <ST.MenuItem>
                <Link to={item.route} onClick={item.action ?? undefined}>
                  {item.title}
                </Link>
              </ST.MenuItem>
            ))}
          </ST.MenuItemsList>
        </ST.ProfileMenu>
      )}
    </ST.Nav>
  );
};

export default Menu;
