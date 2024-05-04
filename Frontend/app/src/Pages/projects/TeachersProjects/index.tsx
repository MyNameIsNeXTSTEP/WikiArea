import { useDispatch, useSelector } from "react-redux";
import { IProject } from "~/src/a-lib";
import StandardProject from "../StandardProject";
import { useEffect, useState } from "react";
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";
import { setChangeAddTestsOpen, setShowModerated, setStage } from "~/src/features/store/projects";
import EditProjectPage from "../Components/Edit-project";
import ProjectsControls from "../Components/Project-controls/ProjectsControls";

const TeachersProjects = (): JSX.Element => {
    const dispatch = useDispatch();
    const {
        projects: {
            all: projectsAll,
            showModerated,
            isOpenEditProjectPage,
            isAddTestsOpen,
            stage,
        }
    } = useSelector(state => ({
        projects: state.projects
    }));
    const [projectsToShow, updateProjectsToShow] = useState<IProject[]>(projectsAll);

    // @todo: move to the teachers controls
    useEffect(() => {
        if (showModerated) {
            updateProjectsToShow(
                projectsAll.filter(el => el.is_moderation_in_progress === 1)
            );
        } else {
            updateProjectsToShow(projectsAll);
        }
        dispatch(setStage(0));
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

    useEffect(() => {
        if (isAddTestsOpen) {
            dispatch(updateMainMenuFlag(false));
            dispatch(changeBackBtnVisability(false));
            dispatch(updateButtons([
                {
                    id: 1,
                    onClick: () => dispatch(setChangeAddTestsOpen(false)),
                },
                {
                    id: 2,
                    onClick: () => console.log(true),
                    label: 'Сохранить',
                    props: {
                        $whiteBordered: true,
                        width: '150px',
                        style: { marginTop: '15px', marginBottom: '15px'}
                    },
                },
            ]));
        }
    }, []);

    return <>
        { stage === 0 && <ProjectsControls projectsToShow={projectsToShow} updateProjectsToShow={updateProjectsToShow}/> }
        {isOpenEditProjectPage
            ? <EditProjectPage/> 
            : projectsToShow.map((el: IProject) => <StandardProject project={el}/>)
        }
    </>;
};

export default TeachersProjects;