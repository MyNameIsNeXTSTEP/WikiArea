import { useSelector } from "react-redux";
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { Left, Right } from "~/src/UI-shared/Atoms/Containers";
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { Title } from "~/src/UI-shared/Tokens";

const OtherUsers = (): JSX.Element => {
    const users = useSelector(state => state.users) || [{login: '123'}] ;
    return <>
        <Title>Пользователи</Title>
        {users.map(el => {
            return <WidgetWith2Items $rounded>
                <Left>
                    {el.login}
                </Left>
                <Right>
                    <StandartButton $white $width='160px' onClick={() => alert('Tried to block the user: error')}>Заблокировать</StandartButton>
                </Right>
            </WidgetWith2Items>
        })}
    </>
};

export default OtherUsers;