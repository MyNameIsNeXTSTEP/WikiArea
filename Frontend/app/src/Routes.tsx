import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/main/MainPage";
import UserPage from "./Pages/user/UserPage";
import ProjectsPage from "./Pages/projects/ProjectsPage";
import AnalyticsPage from "./Pages/analytics/AnalyticsPage";
import ChatPage from "./Pages/chat/ChatPage";
import Menu from "../../UI-shared/Organisms/Menu";
import OtherUsers from "./Pages/admin/OtherUsers";

const AppRoutes = () => {
    return (
        <Router>
            <Menu className='main-menu'/>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/user/:role" element={<UserPage/>} />
                <Route path="/projects" element={<ProjectsPage/>} />
                <Route path="/other-users" element={<OtherUsers/>} />
                <Route path="/analytics" element={<AnalyticsPage/>} />
                <Route path="/chat" element={<ChatPage/>} />
            </Routes>
        </Router>
    )
};

export default AppRoutes;