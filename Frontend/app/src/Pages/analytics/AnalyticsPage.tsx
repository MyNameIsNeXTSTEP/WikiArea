import { useSelector } from "react-redux"
import { EUserRoles } from "~/src/a-lib";
import StudentsAnalytics from "./student/StudentsAnalytics";
import TeachersAnalytics from "./teacher/TeachersAnalytics";
import AdminsAnalytics from "./admin/AdminsAnalytics";
import { getCookie } from "~/src/helpers";
import { useNavigate } from 'react-router-dom';

const AnalyticsPage = (): JSX.Element => {
    const role = useSelector(state => state.profile.auth.role);
    const navigate = useNavigate();
    const accessToken = getCookie('access_token');
    if (!Boolean(accessToken?.length)) navigate('/');
    return <>
        { role === EUserRoles.student && <StudentsAnalytics/> }
        { role === EUserRoles.teacher && <TeachersAnalytics/> }
        { role === EUserRoles.admin && <AdminsAnalytics/> }
    </>
};

export default AnalyticsPage;
