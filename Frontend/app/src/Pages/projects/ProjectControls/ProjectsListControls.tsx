import { Dispatch, SetStateAction, useState } from "react";
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import AddNewProjectPopup from "../AddNewProject/AddNewProjectPopup";
import { useDispatch, useSelector } from "react-redux";
import { setShowModerated } from "~/src/features/store/projects";

interface IProps {
    role: string,
    // This actions are just for the parent component to pas them trough and not use multiple props drilling
    // actual other roles handlers are present just inside this component
    controlRoleActions: Record<string, Function | Record<string, Function>>,
    updatePopupConfig: Dispatch<SetStateAction<any>>,
    openPopup: Dispatch<SetStateAction<boolean>>,
    popupConfig: any
}

const ProjectsListControls = ({ role, controlRoleActions, updatePopupConfig, popupConfig, openPopup }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const showModerated = useSelector(state => state.projects.showModerated);
    const addProject = () => {
        // openPopup(true);
        updatePopupConfig({
            ...popupConfig,
            isOpen: true,
            text: 'Добвление проекта',
            firstBtn: 'Добавить',
            firstBtnOnClick: () => console.log(1),
        })
    };

    const openProjectOnModeration = () => {
        dispatch(setShowModerated(true))
    };

    const moderateProjectByAdmin = () => {
    };

    const showDeletedProjects = () => {
        
    };

    switch (role) {
        case 'students':
            return <StandartButton $width='180px' onClick={controlRoleActions[role]}>Мои проекты</StandartButton>
        case 'teachers':
            return <>
                {
                    showModerated
                        ? <StandartButton $width='260px' onClick={() => alert(1)}>Удалённые проекты</StandartButton>
                        : <>
                            <StandartButton $width='180px' onClick={addProject}>Добавить проект</StandartButton>
                            <StandartButton $width='260px' style={{ marginLeft: '20px'}} onClick={openProjectOnModeration}>Проекты на модерации</StandartButton>
                            {popupConfig.isOpen && <AddNewProjectPopup onClose={() => updatePopupConfig({ isOpen: false })}/>}
                        </>
                }
            </>
        case 'admins':
            return <StandartButton $width='180px' onClick={moderateProjectByAdmin}>Модерация проектов</StandartButton>
        default:
            return <></>
    }
};

export default ProjectsListControls;