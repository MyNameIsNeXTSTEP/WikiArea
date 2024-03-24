import { useState } from "react";
import { Left, Right } from "../../Atoms/Containers";
import * as ST from "./styled";
import ProfileLogo from "~/src/assets/svg/Profile.svg";
import Back from "~/src/assets/svg/Back.svg";
import { BackMenuBtn, ProfileImage } from "../../Atoms/icons";
import { useSelector } from "react-redux";
import { StandartButton } from "../../Atoms/Buttons";

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
  const { buttons, isBackBtnDisabled, isMainMenu } = useSelector(state => state.menu);
  const [isOpen, openMenu] = useState(false);
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
        {isMainMenu
            ? <ProfileImage src={ProfileLogo} onClick={() => openMenu(!isOpen)} />
            : !isBackBtnDisabled && <BackMenuBtn src={Back} onClick={back} />
        }
        {buttons.map((button) => (
          <StandartButton id="extra-menu-buttons" {...button.props} key={button.id} onClick={button.onClick}>
            {button.label}
          </StandartButton>
        ))}  
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
