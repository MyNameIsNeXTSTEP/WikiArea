import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StandardProject from '../StandardProject';
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";
import { IModule, IProject } from '~/src/a-lib/index';
import SubscribedProjects from '../SubscribedProjects';
import ProjectsControls from "./ProjectsControls";
import { setIsOpenSubscribedProjects, setProjectDetailsPage, setStage } from "~/src/features/store/projects";
import ProjectDetails from "../Components/Project-deatails/ProjetcDetails";
import ProjectModule from "./ProjectModule";
import ModuleTests from "../Components/Module-tests";

const StudentsProjects = (): JSX.Element => {
    const dispatch = useDispatch();
    const {
        projects:{
            all: projectsAll,
            isOpenSubscribedProjects,
            projectDetailsPage,
            stage,
            subscribedProjectsIds,
        },
        projectModules,
    } = useSelector(state => ({
        projects: state.projects,
        projectModules: state.modules.all,
    }));
    const [projectsToShow, updateProjectsToShow] = useState<IProject[]>(projectsAll);
    const [isModuleTestsOpen, openModuleTests] = useState(false);

    useEffect(() => {
        dispatch(setStage(0));
        dispatch(updateMainMenuFlag(true));
        dispatch(changeBackBtnVisability(true));
        dispatch(setIsOpenSubscribedProjects(false));
        dispatch(setProjectDetailsPage(false));
    }, []);

    const showSubscribedProjects = useCallback(() => {
        const sunscribedProjects = projectsAll.filter((pr: IProject) => subscribedProjectsIds.includes(pr.id));
        updateProjectsToShow(sunscribedProjects);
    }, []);

    useEffect(() => {
        if (isOpenSubscribedProjects) {
            showSubscribedProjects();
            dispatch(updateButtons([{
                id: 1,
                onClick: () => {
                    dispatch(setStage(0));
                    dispatch(setIsOpenSubscribedProjects(false));
                    updateProjectsToShow(projectsAll);
                    dispatch(updateMainMenuFlag(true));
                    dispatch(changeBackBtnVisability(true));
                },
            }]));
        }
    }, [isOpenSubscribedProjects])

    return <>
        { stage === 0 && <ProjectsControls projectsToShow={projectsToShow} updateProjectsToShow={updateProjectsToShow}/> }
        {!projectDetailsPage.isOpen && !isModuleTestsOpen && projectsToShow.map((el: IProject) => {
            return !isOpenSubscribedProjects
                ? <StandardProject project={el}/>
                : <SubscribedProjects project={el}/>
        })}
        { projectDetailsPage.isOpen && <ProjectDetails project={projectDetailsPage.project}/> }
        { projectDetailsPage.isOpen && !isModuleTestsOpen && projectModules.map((el: IModule) => <ProjectModule projectModule={el} openModuleTests={openModuleTests}/>) }
        { !projectDetailsPage.isOpen && isModuleTestsOpen && <ModuleTests/> }
    </>
};

export default StudentsProjects;