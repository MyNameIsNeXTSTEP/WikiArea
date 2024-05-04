import { useEffect } from 'react';
import { EUserRoles } from '~/src/a-lib'
import { useDispatch, useSelector } from 'react-redux';
import { TRequestMethod } from '@api-package/types';
import APIRequest from '@api-package/index';
import { setDeletedProjects, setProjectsAll, setSubscribedProjectsIds } from '~/src/features/store/projects';
import { setPageStagesData } from '~/src/features/store/pages';
import AdminsProjects from './AdminsProjects';
import StudentsProjects from './StudentProjects';
import TeachersProjects from './TeachersProjects';
import { setProjectModulesAll } from '~/src/features/store/projectModule';

const ProjectsPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const { role, email } = useSelector(state => state.profile.auth);

    useEffect(() => {
        dispatch(setPageStagesData({ page: '/projects', stage: 0 }))
    }, [])
    
    useEffect(() => {
        (async () => {
            await new APIRequest({
                uri: `/api/projects/get-all`,
                method: TRequestMethod.GET,
                queryParams: { email },
            })
            .doRequest()
            .then(res => {
                dispatch(setProjectsAll(res.payload.projects))
                dispatch(setProjectModulesAll(res.payload.modules))
                dispatch(setSubscribedProjectsIds(res.payload.subscribedProjectIds))
            });
        })();

        (async () => {
            await new APIRequest({
                uri: '/api/projects/get-deleted',
                method: TRequestMethod.GET,
            })
            .doRequest()
            .then(res => dispatch(setDeletedProjects(res.payload)));
        })();
    }, [])

    return <>
        { role === EUserRoles.student && <StudentsProjects/> }
        { role === EUserRoles.teacher && <TeachersProjects/> }
        { role === EUserRoles.admin && <AdminsProjects/> }
    </>
};

export default ProjectsPage;
