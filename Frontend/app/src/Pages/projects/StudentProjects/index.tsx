import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StandardProject from '../StandardProject';

import { changeBackBtnVisability, updateMainMenuFlag } from "~/src/features/store/menu";
import { IProject } from '~/src/a-lib/index';
import SubscribedProjects from '../SubscribedProjects';
import ProjectsControls from "./ProjectsControls";
import { setIsOpenSubscribedProjects, setProjectDetailsPage, setStage } from "~/src/features/store/projects";
import ProjectDetails from "../Components/Project-deatails/ProjetcDetails";
import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";

const StudentsProjects = (): JSX.Element => {
    const dispatch = useDispatch();
    const {
        all: projectsAll,
        isOpenSubscribedProjects,
        projectDetailsPage,
        stage,
    } = useSelector(state => state.projects);
    const studentEmail = useSelector(state => state.profile.auth.email);
    const [projectsToShow, updateProjectsToShow] = useState<IProject[]>(projectsAll);

    useEffect(() => {
        dispatch(setStage(0));
        dispatch(updateMainMenuFlag(true));
        dispatch(changeBackBtnVisability(true));
        dispatch(setIsOpenSubscribedProjects(false));
        dispatch(setProjectDetailsPage(false));
    }, []);

    const showSubscribedProjects = async () => {
        const res = await new APIRequest({
            uri: `/api/projects/get-subscribed-by-student/${studentEmail}`,
            method: TRequestMethod.GET,
        }).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            console.log(res, 'subscribed projects');
            updateProjectsToShow(res.payload)
        }
    };

    useEffect(() => {
        if (isOpenSubscribedProjects) showSubscribedProjects();
    }, [isOpenSubscribedProjects])

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
        { projectDetailsPage.isOpen && <ProjectDetails project={projectDetailsPage.project}/> }
    </>
};

export default StudentsProjects;