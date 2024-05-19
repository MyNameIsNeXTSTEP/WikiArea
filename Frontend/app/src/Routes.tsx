import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/main/MainPage";
import UserPage from "./Pages/user/UserPage";
import ProjectsPage from "./Pages/projects/ProjectsPage";
import AnalyticsPage from "./Pages/analytics/AnalyticsPage";
import ChatPage from "./Pages/chat/ChatPage";
import Menu from "../../UI-shared/Organisms/Menu";
import ManageUsers from "./Pages/admin/ManageUsers";
import { Persistor } from "redux-persist";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./features/store/profile";
import { getCookie } from "./helpers";
import { useEffect, useState } from "react";

interface IStore {
    persistor: Persistor;
}

const AppRoutes = ({ persistor }: IStore ) => {
    const dispatch = useDispatch();
    const [isShowMenu, setIsShowMenu] = useState(true);
    const auth = useSelector(state => state.profile.auth);
    const accessToken = getCookie('access_token');
    const onExit = () => {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsShowMenu(false);
        dispatch(logout());
        persistor.purge();
    };
    useEffect(() => {
        if (!accessToken || accessToken.length === 0 || Object.values(auth).length === 0)
            setIsShowMenu(false);
    }, [accessToken, auth]);
    return (
        <Router>
            { window.location.pathname !== '/' && isShowMenu &&
                <Menu
                    className='main-menu'
                    onExit={onExit}
                />
            }
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/user/:role" element={<UserPage/>}/>
                <Route path="/user/admins/manage-users" element={<ManageUsers/>}/>
                <Route path="/projects" element={<ProjectsPage/>}/>
                <Route path="/analytics" element={<AnalyticsPage/>}/>
                <Route path="/chat" element={<ChatPage/>}/>
            </Routes>
        </Router>
    )
};

export default AppRoutes;