import { useDispatch, useSelector } from "react-redux";
import { StandartButton } from "@ui/Atoms/Buttons";
import { Left, Right } from "@ui/Atoms/Containers";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { Title } from "@ui/Tokens";
import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import { IProfileAuthData, setUsersData } from "~/src/features/store/users";
import { useEffect, useState } from "react";
import { StandartPopupWithContent } from "~/src/Components/Popup/StandartPopupWithContent";
import AddNewUserPopup from "./AddNewUserPopup";

const ManageUsers = (): JSX.Element => {
    const dispatch = useDispatch();
    const [didBlockedUser, setDidBlockedUser] = useState(false);
    const [isOpenBlockUserPopup, setIsOpenBlockUserPopup] = useState(false);
    const [isOpenAddNewUserPopup, setIsOpenAddNewUserPopup] = useState(false);
    const [userLoginToBlock, setUserLoginToBlock] = useState('');
    const {
        users,
        adminLogin,
    } = useSelector(state => ({
        users: state.users.users,
        adminLogin: state.profile.auth.login,
    }));
    const openAddNewUserPopup = () => {
        setIsOpenAddNewUserPopup(true);
    };
    const onOpenBlockUserPopup = (userLogin: string) => {
        setIsOpenBlockUserPopup(true);
        setUserLoginToBlock(userLogin)
    }
    const onBlockUser = async (userToBlock: string) => {
        const resp = await new APIRequest({
            uri: '/api/users/admin/block-user',
            method: TRequestMethod.POST,
            body: JSON.stringify({
                adminLogin,
                userToBlock
            }),
        }).doRequest();
        if (!resp.isSuccess) {
            alert('Error on trying to block a user');
            return;
        };
        setIsOpenBlockUserPopup(false);
        setDidBlockedUser(true);
    };
    const getAllUsers = async () => {
        const res = await new APIRequest({
            uri: '/api/users/get-all',
            method: TRequestMethod.GET,
        }).doRequest();
        if (res.isSuccess) {
            const set = res.payload.map((user: IProfileAuthData) => ({
                role: user.role,
                email: user.email,
                login: user.login,
            }));
            dispatch(setUsersData(set))
        }
    };
    useEffect(() => {
        (async () => await getAllUsers())();
    }, [didBlockedUser]);

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
        {/* @todo: move the below code to external component <UsersList/> */}
        {users.map((el: IProfileAuthData) => {
            return <WidgetWith2Items $rounded>
                <Left>
                    {el.login}
                </Left>
                <Right>
                    <StandartButton $white $width='160px' onClick={() => onOpenBlockUserPopup(el.login)}>
                        Заблокировать
                    </StandartButton>
                </Right>
            </WidgetWith2Items>
        })}
        <StandartPopupWithContent
          isOpen={isOpenBlockUserPopup}
          updateIsOpen={setIsOpenBlockUserPopup}
          text='Вы действительно хотите заблокировать этого пользователя ?'
          firstBtn='Заблокировать'
          firstBtnOnClick={() => onBlockUser(userLoginToBlock)}
          height="250px"
          btnWidth="150px"
        />
        { isOpenAddNewUserPopup && <AddNewUserPopup onClose={() => setIsOpenAddNewUserPopup(false)}/>}
    </>
};

export default ManageUsers;