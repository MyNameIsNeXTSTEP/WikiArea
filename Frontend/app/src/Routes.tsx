import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/main/MainPage";
import UserPage from "./Pages/user/UserPage";
import ProjectsPage from "./Pages/projects/ProjectsPage";
import AnalyticsPage from "./Pages/analytics/AnalyticsPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path="/user" element={<UserPage/>} />
                <Route path="/projects" element={<ProjectsPage/>} />
                <Route path="/analytics" element={<AnalyticsPage/>} />
                {/* <Route path="/teacher" element={<TeacherPage/>} /> */}
                {/* <Route path="/admin" element={<AdminPage/>} /> */}
            </Routes>
        </Router>
    )
};

export default AppRoutes;