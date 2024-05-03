import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StandardProject from '../StandardProject';

import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";
import { IProject } from '~/src/a-lib/index';
import SubscribedProjects from '../SubscribedProjects';
import ProjectsControls from "./ProjectsControls";
import { setIsOpenSubscribedProjects, setProjectDetailsPage, setStage } from "~/src/features/store/projects";

const StudentsProjects = (): JSX.Element => {
    const dispatch = useDispatch();
    const {
        all: projectsAll,
        isOpenSubscribedProjects,
        projectDetailsPage,
        stage,
    } = useSelector(state => state.projects);
    const [projectsToShow, updateProjectsToShow] = useState(projectsAll);

    useEffect(() => {
        dispatch(setStage(0));
        dispatch(updateMainMenuFlag(true));
        dispatch(changeBackBtnVisability(true));
        dispatch(setIsOpenSubscribedProjects(false));
        dispatch(setProjectDetailsPage(false));
    }, []);

    return <>
        { stage === 0 && <ProjectsControls projectsToShow={projectsToShow} updateProjectsToShow={updateProjectsToShow}/> }
        {!projectDetailsPage.isOpen && 
            <>
                {projectsToShow.map((el: IProject) => {
                    return !isOpenSubscribedProjects
                        ? stage === 0 && <StandardProject project={el}/>
                        : stage === 1 && <SubscribedProjects project={el}/>
                })}
            </>
        }
    </>
};

export default StudentsProjects;