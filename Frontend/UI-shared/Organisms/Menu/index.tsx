import * as ST from "./styled";
import { useState } from "react";
import { Left, Right } from "@ui/Atoms/Containers";
import { BackMenuBtn, ProfileImage } from "@ui/Atoms/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProfileLogo, Back } from "@ui/assets/svg";

interface IMenuItem {
  title: string;
  route: string;
  action?: () => void;
}

interface IProps {
  className?: string,
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

  const onExit = () => {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.localStorage.clear();
  };
  const menuDoubleItem = {
    titile: role !== 'admins' ? 'Проекты' : 'Пользователи',
    route: role !== 'admins' ? '/projects' : '/other-users'
  }
  const menuItems: IMenuItem[] = [
    { title: "Профиль", route: `/user/${role}` },
    { title: menuDoubleItem.titile, route: menuDoubleItem.route },
    { title: "Аналитика", route: "/analytics" },
    { title: "Чат", route: "/chat" },
    { title: "Выход", route: "/", action: onExit },
  ];
 
  return (
    <ST.Nav {...props}>
      <Left>Wikiarea</Left>
      <Right>
        {isMainMenu
            ? <ProfileImage src={ProfileLogo} onClick={() => openMenu(!isOpen)} />
            : !isBackBtnDisabled && <BackMenuBtn src={Back} onClick={buttons[0].onClick} />
        }
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
