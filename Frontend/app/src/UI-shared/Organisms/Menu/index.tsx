import { useState } from 'react';
import { Left, Right } from '../../Atoms/Containers';
import * as ST from './styled';

interface IMenuItem {
    title: string,
    action?: () => void;
};

const menuItems: IMenuItem[] = [
    { title: 'Профиль' },
    { title: 'Курсы' },
    { title: 'Аналитика' },
    { title: 'Чат' },
    { title: 'Выход' }
]

const Menu = (): JSX.Element => {
    const [isOpen, openMenu] = useState(false);
    return <ST.Nav>
        <Left>Wikiarea</Left>
        <Right>
            <ST.PofileMenuIcon onClick={() => openMenu(!isOpen)}>Profile</ST.PofileMenuIcon>
        </Right>
        {isOpen && <ST.ProfileMenu>
            <ST.MenuItemsList>
                {menuItems.map(item => <ST.MenuItem>{item.title}</ST.MenuItem>)}
            </ST.MenuItemsList>
        </ST.ProfileMenu>
        }
    </ST.Nav>
}

export default Menu;