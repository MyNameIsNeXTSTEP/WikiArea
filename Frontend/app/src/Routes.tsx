import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>} />
                {/* <Route path="/student" element={<StudentPage/>} /> */}
                {/* <Route path="/teacher" element={<TeacherPage/>} /> */}
                {/* <Route path="/admin" element={<AdminPage/>} /> */}
            </Routes>
        </Router>
    )
};

export default AppRoutes;