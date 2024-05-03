import { useEffect } from 'react';
import { EUserRoles } from '~/src/a-lib'
import { useDispatch, useSelector } from 'react-redux';
import { TRequestMethod } from '@api-package/types';
import APIRequest from '@api-package/index';
import { setDeletedProjects, setProjectsAll } from '~/src/features/store/projects';
import { setPageStagesData } from '~/src/features/store/pages';
import AdminsProjects from './AdminsProjects';
import StudentsProjects from './StudentProjects';
import TeachersProjects from './TeachersProjects';

const ProjectsPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const role = useSelector(state => state.profile.auth.role);

    useEffect(() => {
        dispatch(setPageStagesData({ page: '/projects', stage: 0 }))
    }, [])
    
    useEffect(() => {
        const requestAll = {
            uri: '/api/projects/get-all',
            method: TRequestMethod.GET,
        };
        (async () => {
            await new APIRequest(requestAll)
                .doRequest()
                .then(res => dispatch(setProjectsAll(res.payload)));
        })();
        const requestDeleted = {
            uri: '/api/projects/get-deleted',
            method: TRequestMethod.GET,
        };
        (async () => {
            await new APIRequest(requestDeleted)
                .doRequest()
                .then(res => dispatch(setDeletedProjects(res.payload)));
        })();
    }, [])

    return <>
        { role === EUserRoles.student && <StudentsProjects/> }
        { role === EUserRoles.teacher && <TeachersProjects/> }
        { role === EUserRoles.admin && <AdminsProjects/> }

        {/* { !isModuleTestsOpen && <GeneralProjectsList/> }
        { projectDetailsPage.isOpen && <ProjectDetails project={projectDetailsPage.project}/> }
        { projectDetailsPage.isOpen && projectModules.map(el => <ProjectModule projectModule={el}/>) }
        { isModuleTestsOpen && <ModuleTests/> } */}
    </>
};

export default ProjectsPage;
