import { useDispatch, useSelector } from "react-redux";
import { IProject } from "~/src/a-lib";
import StandardProject from "../StandardProject";
import { useEffect, useState } from "react";
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";
import { setShowModerated } from "~/src/features/store/projects";
import EditProjectPage from "../Components/Edit-project";

const TeachersProjects = (): JSX.Element => {
    const dispatch = useDispatch();
    const {
        projects: {
            all: projectsAll,
            projectDetailsPage,
            showModerated,
            isOpenEditProjectPage,
        }
    } = useSelector(state => ({
        projects: state.projects
    }));
    const [projectsToShow, updateProjectsToShow] = useState<IProject[]>(projectsAll);

    // @todo: move to the teachers controls
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
        if (showModerated) {
            dispatch(updateMainMenuFlag(false));
            dispatch(changeBackBtnVisability(false));
            dispatch(updateButtons([{
                id: 1,
                onClick: () => dispatch(setShowModerated(false)),
            }]));
        } else {
            dispatch(updateMainMenuFlag(true));
            dispatch(changeBackBtnVisability(true));
            dispatch(setShowModerated(false));
        }
    }, [showModerated]);

    return <>
        {isOpenEditProjectPage
            ? <EditProjectPage/> 
            : projectsToShow.map((el: IProject) => <StandardProject project={el}/>)
        }
    </>;
};

export default TeachersProjects;