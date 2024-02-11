import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/Main";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage/>} />
            </Routes>
        </Router>
    )
};

export default AppRoutes;