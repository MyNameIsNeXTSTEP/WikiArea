import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Profile from "~/src/Components/Profile/Profile";
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";

const UserPage = (): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateMainMenuFlag(false));
        dispatch(changeBackBtnVisability(false));
        dispatch(updateButtons([{
            id: 1,
            onClick: () => alert('menu updated'),
            src: 'Profile',
        }]));
    }, [])
    return <Profile/>;
};

export default UserPage;