import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/main/MainPage";
import UserPage from "./Pages/user/UserPage";
import ProjectsPage from "./Pages/projects/ProjectsPage";
import AnalyticsPage from "./Pages/analytics/AnalyticsPage";
import ChatPage from "./Pages/chat/ChatPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/user/:role" element={<UserPage/>} />
                <Route path="/projects" element={<ProjectsPage/>} />
                <Route path="/analytics" element={<AnalyticsPage/>} />
                <Route path="/chat" element={<ChatPage/>} />
                {/* <Route path="/admin" element={<AdminPage/>} /> */}
            </Routes>
        </Router>
    )
};

export default AppRoutes;