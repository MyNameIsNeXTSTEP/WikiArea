import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EUserRoles } from "~/src/a-lib/index";
import StandardProject from './StandardProject';

import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";
import { setShowModerated } from "~/src/features/store/projects";
import { IProject } from '~/src/a-lib/index';
import ProjectOnModeration from "./ProjectsOnModeration";
import SubscribedProjects from './SubscribedProjects';
import EditProjectPage from "./Components/Edit-project";

const GeneralProjectsList = (): JSX.Element | null => {
    const dispatch = useDispatch();
    const {
        all: projectsAll,
        isOpenSubscridebProjects,
        projectDetailsPage,
        isOpenEditProjectPage
    } = useSelector(state => state.projects);
    const userRole = useSelector(state => state.profile.auth.role);
    const [projectsToShow, updateProjectsToShow] = useState(projectsAll);
    const showModerated = useSelector(state => state.projects.showModerated);
    const ProjectComponent = showModerated
        ? ProjectOnModeration
        : StandardProject;
    useEffect(() => {
        if (showModerated) {
            updateProjectsToShow(
                projectsAll.filter(el => el.is_moderated === 1)
            );
        } else {
            updateProjectsToShow(projectsAll);
        }
    }, [showModerated]);
    useEffect(() => {
        // @todo: Need strong refactor on the menu handling logic !!!
        if (showModerated) {
            dispatch(updateMainMenuFlag(false));
            dispatch(changeBackBtnVisability(false));
            dispatch(updateButtons([{
                id: 1,
                onClick: () => dispatch(setShowModerated(false)),
                src: 'Profile',
            }]));
        } else {
            dispatch(updateMainMenuFlag(true));
            dispatch(changeBackBtnVisability(true));
            dispatch(setShowModerated(false));
        }
    }, [showModerated]);
    
    return <>
        { (userRole === EUserRoles.student && !projectDetailsPage.isOpen)
            ? <>
                {projectsToShow.map((el: IProject) => {
                    return isOpenSubscridebProjects
                        ? <SubscribedProjects project={el}/>
                        : <ProjectComponent project={el}/>
                })}
            </>
            : null
        }
        { (userRole !== EUserRoles.teacher && !isOpenEditProjectPage)
            ? <>
                {projectsToShow.map((el: IProject) => <ProjectComponent project={el}/>)}
            </>
            : (userRole === EUserRoles.teacher && isOpenEditProjectPage) ? <EditProjectPage/> : projectsToShow.map((el: IProject) => <ProjectComponent project={el}/>)
        }
    </>
};

export default GeneralProjectsList;