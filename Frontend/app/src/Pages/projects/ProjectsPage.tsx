import { EUserRoles } from '~/src/a-lib'
import { useSelector } from 'react-redux';
import AdminsProjects from './AdminsProjects';
import StudentsProjects from './StudentProjects';
import TeachersProjects from './TeachersProjects';

const ProjectsPage = (): JSX.Element => {
    const { role } = useSelector(state => state.profile.auth);
    return <>
        { role === EUserRoles.student && <StudentsProjects/> }
        { role === EUserRoles.teacher && <TeachersProjects/> }
        { role === EUserRoles.admin && <AdminsProjects/> }
    </>
};

export default ProjectsPage;
