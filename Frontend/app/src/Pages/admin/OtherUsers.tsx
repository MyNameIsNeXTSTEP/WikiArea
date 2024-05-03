import { useSelector } from "react-redux";
import { StandartButton } from "@ui/Atoms/Buttons";
import { Left, Right } from "@ui/Atoms/Containers";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { Title } from "@ui/Tokens";

const OtherUsers = (): JSX.Element => {
    const  { users } = useSelector(state => state.users) || [{login: '123'}] ;
    const openAddNewUserPopup = () => {

    }
    return <>
        <WidgetWith2Items $transparent>
            <Left width='auto'>
                <Title>Пользователи</Title>
            </Left>
            <Right>
                <StandartButton $bordered $width="300px" onClick={openAddNewUserPopup}>
                    Добавить пользователя
                </StandartButton>
            </Right>
        </WidgetWith2Items>
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