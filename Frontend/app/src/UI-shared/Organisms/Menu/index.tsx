import { useState } from "react";
import { Left, Right } from "../../Atoms/Containers";
import * as ST from "./styled";
import ProfileLogo from "~/src/assets/svg/Profile.svg";
import Back from "~/src/assets/svg/Back.svg";
import { BackMenuBtn, ProfileImage } from "../../Atoms/icons";
import { useSelector } from "react-redux";

interface IMenuItem {
  title: string;
  route?: string;
  action?: () => void;
}

// const useRouter = (props: any) => {
//     if (useLocation().pathname === props.to.toString()) {
//         return <Link {...props} to="/refresh" />
//     }
//     return <Link {...props} />;
// };

const Menu = (): JSX.Element => {
  const [isOpen, openMenu] = useState(false);
  // const isMainMenu = useSelector(state => state.menu.isMainMenu);
  // const customMenuBtns = useSelector(state => state.menu.customMenuBtns);
  const isMainMenu = false;
  const back = () => alert('back clicked');
  const menuItems: IMenuItem[] = [
    { title: "Профиль", route: "/user" },
    { title: "Проекты", route: "/projects" },
    { title: "Аналитика", route: "/analytics" },
    { title: "Чат", route: "/chat" },
    { title: "Выход", action: () => alert("exit") },
  ];
  return (
    <ST.Nav>
      <Left>Wikiarea</Left>
      <Right>
        { isMainMenu
          ? <ProfileImage src={ProfileLogo} onClick={() => openMenu(!isOpen)} />
          : <BackMenuBtn src={Back} onClick={back} />
        }
      </Right>
      {isOpen && (
        <ST.ProfileMenu>
          <ST.MenuItemsList>
            <ST.IconBlock>
              <ST.Cancel size={40} color={"white"} onClick={close} />
            </ST.IconBlock>
            {menuItems.map((item) => (
              <ST.MenuItem>
                <a href={item.route} onClick={item.action ?? undefined}>
                  {item.title}
                </a>
              </ST.MenuItem>
            ))}
          </ST.MenuItemsList>
        </ST.ProfileMenu>
      )}
    </ST.Nav>
  );
};

export default Menu;
