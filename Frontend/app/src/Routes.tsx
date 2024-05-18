import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/main/MainPage";
import UserPage from "./Pages/user/UserPage";
import ProjectsPage from "./Pages/projects/ProjectsPage";
import AnalyticsPage from "./Pages/analytics/AnalyticsPage";
import ChatPage from "./Pages/chat/ChatPage";
import Menu from "../../UI-shared/Organisms/Menu";
import ManageUsers from "./Pages/admin/ManageUsers";
import { Persistor } from "redux-persist";
import { useDispatch } from "react-redux";
import { logout } from "./features/store/profile";

interface IStore {
    persistor: Persistor;
}

const AppRoutes = ({ persistor }: IStore ) => {
    const dispatch = useDispatch();
    const onExit = () => {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        dispatch(logout());
        persistor.purge();
    };
    return (
        <Router>
            { window.location.pathname !== '/' &&
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