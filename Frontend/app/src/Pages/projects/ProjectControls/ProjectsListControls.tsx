import { Dispatch, SetStateAction, useState } from "react";
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import AddNewProjectPopup from "../AddNewProject/AddNewProjectPopup";
import { useDispatch, useSelector } from "react-redux";
import { setShowModerated } from "~/src/features/store/projects";
import { RawPopupWithElements } from "~/src/Components/Popup/StandartPopupWithContent";

interface IProps {
    role: string,
    // This actions are just for the parent component to pas them trough and not use multiple props drilling
    // actual other roles handlers are present just inside this component
    controlRoleActions: Record<string, Function | Record<string, Function>>,
    updatePopupConfig: Dispatch<SetStateAction<any>>,
    openPopup: Dispatch<SetStateAction<boolean>>,
    popupConfig: any
}

const ProjectsListControls = ({ role, controlRoleActions, updatePopupConfig, popupConfig }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const showModerated = useSelector(state => state.projects.showModerated);
    const deletedProjects = useSelector(state => state.projects.deleted);
    const addProject = () => {
        updatePopupConfig({
            ...popupConfig,
            id: 'add-new-project',
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
        updatePopupConfig({
            ...popupConfig,
            id: 'show-deleted-projects',
            isOpen: true,
        })
    };

    switch (role) {
        case 'students':
            return <StandartButton $width='180px' onClick={controlRoleActions[role]}>Мои проекты</StandartButton>
        case 'teachers':
            return <>
                {
                    showModerated
                        ? <>
                            <StandartButton $width='260px' onClick={showDeletedProjects}>Удалённые проекты</StandartButton>
                            {popupConfig.isOpen && popupConfig.id === 'show-deleted-projects' &&
                            <RawPopupWithElements isOpen={popupConfig.isOpen} updateIsOpen={updatePopupConfig}
                                textObj={{ title: 'Название проекта', text: 'Причина удаления' }} elements={deletedProjects}/>}
                        </> 
                        : <>
                            <StandartButton $width='180px' onClick={addProject}>Добавить проект</StandartButton>
                            <StandartButton $width='260px' style={{ marginLeft: '20px'}} onClick={openProjectOnModeration}>Проекты на модерации</StandartButton>
                            {popupConfig.isOpen && popupConfig.id === 'add-new-project' && <AddNewProjectPopup onClose={() => updatePopupConfig({ isOpen: false })}/>}
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