import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";
import { IModule, IProject } from '~/src/a-lib/index';
import ProjectsControls from "../Components/Project-controls/ProjectsControls";
import { setIsOpenProjectsModerationPage, setIsOpenSubscribedProjects, setProjectDetailsPage, setStage } from "~/src/features/store/projects";
import ProjectDetails from "../Components/Project-deatails/ProjetcDetails";
import ProjectOnModeration from "./ProjectsOnModeration";
import StandardProject from "../StandardProject";
import ProjectModule from "../ProjectModule";

const AdminsProjects = (): JSX.Element => {
    const dispatch = useDispatch();
    const {
        projects:{
            all: projectsAll,
            isOpenProjectsModerationPage,
            projectDetailsPage,
            stage,
        },
        projectModules,
    } = useSelector(state => ({
        projects: state.projects,
        projectModules: state.modules.all,
    }));
    const [projectsToShow, updateProjectsToShow] = useState<IProject[]>(projectsAll)
    const [isModuleTestsOpen, openModuleTests] = useState(false);

    useEffect(() => {
        dispatch(setStage(0));
        dispatch(updateMainMenuFlag(true));
        dispatch(changeBackBtnVisability(true));
        dispatch(setIsOpenProjectsModerationPage(false));
        dispatch(setProjectDetailsPage(false));
    }, []);

    return <>
        { stage === 0 && <ProjectsControls projectsToShow={projectsToShow} updateProjectsToShow={updateProjectsToShow}/> }
        {!projectDetailsPage.isOpen && !isOpenProjectsModerationPage && projectsToShow.map(
            (el: IProject) => <StandardProject project={el}/>
        )}
        {!projectDetailsPage.isOpen && isOpenProjectsModerationPage && projectsToShow.map(
            (el: IProject) => <ProjectOnModeration project={el}/>
        )}
        { projectDetailsPage.isOpen && <ProjectDetails project={projectDetailsPage.project}/> }
        { projectDetailsPage.isOpen && !isModuleTestsOpen && projectModules.map(
            (el: IModule) => <ProjectModule projectModule={el} openModuleTests={openModuleTests}/>
        )}
    </>
};

export default AdminsProjects;