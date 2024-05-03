import { useSelector } from "react-redux";
import { IProject } from "~/src/a-lib";
import StandardProject from "../StandardProject";
import { useEffect } from "react";

const TeachersProjects = (): JSX.Element => {
    const {
        all: projectsAll,
        projectDetailsPage,
        isOpenEditProjectPage
    } = useSelector(state => state.projects);

    // @todo: move to the teachers controls
    // useEffect(() => {
    //     if (showModerated) {
    //         updateProjectsToShow(
    //             projectsAll.filter(el => el.is_moderated === 1)
    //         );
    //     } else {
    //         updateProjectsToShow(projectsAll);
    //     }
    // }, [showModerated]);
    // useEffect(() => {
    //     if (showModerated) {
    //         dispatch(updateMainMenuFlag(false));
    //         dispatch(changeBackBtnVisability(false));
    //         dispatch(updateButtons([{
    //             id: 1,
    //             onClick: () => dispatch(setShowModerated(false)),
    //             src: 'Profile',
    //         }]));
    //     } else {
    //         dispatch(updateMainMenuFlag(true));
    //         dispatch(changeBackBtnVisability(true));
    //         dispatch(setShowModerated(false));
    //     }
    // }, [showModerated]);

    return <>
        {!isOpenEditProjectPage &&
            <>
                {projectsAll.map((el: IProject) => <StandardProject project={el}/>)}
            </>
        }
    </>;
};

export default TeachersProjects;