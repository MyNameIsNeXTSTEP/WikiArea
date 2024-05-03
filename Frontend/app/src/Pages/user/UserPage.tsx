import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Profile from "~/src/Components/Profile/Profile";
import { changeBackBtnVisability, updateMainMenuFlag } from "~/src/features/store/menu";

const UserPage = (): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateMainMenuFlag(true));
        dispatch(changeBackBtnVisability(true));
    }, [])
    return <Profile/>;
};

export default UserPage;