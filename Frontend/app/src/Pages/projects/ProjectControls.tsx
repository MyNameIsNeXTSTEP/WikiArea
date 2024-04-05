import { Dispatch, SetStateAction, useState } from "react";
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import AddNewProjectPopup from "./AddNewProject/AddNewProjectPopup";

interface IProps {
    role: string,
    // This actions are just for the parent component to pas them trough and not use multiple props drilling
    // actual other roles handlers are present just inside this component
    controlRoleActions: Record<string, Function | Record<string, Function>>,
    updatePopupConfig: Dispatch<SetStateAction<any>>,
    openPopup: Dispatch<SetStateAction<boolean>>,
    popupConfig: any
}

const ProjectControls = ({ role, controlRoleActions, updatePopupConfig, popupConfig, openPopup }: IProps): JSX.Element => {
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

    };

    const moderateProjectByAdmin = () => {

    };

    switch (role) {
        case 'students':
            return <StandartButton $width='180px' onClick={controlRoleActions[role]}>Мои проекты</StandartButton>
        case 'teachers':
            return <>
                <StandartButton $width='180px' onClick={addProject}>Добавить проект</StandartButton>
                <StandartButton $width='260px' style={{ marginLeft: '20px'}} onClick={openProjectOnModeration}>Проекты на модерации</StandartButton>
                {popupConfig.isOpen && <AddNewProjectPopup onClose={() => updatePopupConfig({ isOpen: false })}/>}
            </>
        case 'admins':
            return <StandartButton $width='180px' onClick={moderateProjectByAdmin}>Модерация проектов</StandartButton>
        default:
            return <></>
    }
};

export default ProjectControls;