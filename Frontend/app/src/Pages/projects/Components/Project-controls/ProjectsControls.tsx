import { Left, Right } from "@ui/Atoms/Containers";
import { StandartInput } from "@ui/Atoms/Inputs";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { Title } from "@ui/Tokens";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenSubscribedProjects, setStage } from "~/src/features/store/projects";
import ProjectsListControls from "./ProjectsListControls";
import { debounce, IProject } from "~/src/a-lib";
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";

interface IProps {
    projectsToShow: IProject[],
    updateProjectsToShow: Dispatch<SetStateAction<IProject[]>>,
}

// @todo: [BUG] when do searching the inout field rerenders and projects filtering went wrong (?)
const ProjectsControls = ({ projectsToShow, updateProjectsToShow }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const {
        projects: { isOpenSubscridebProjects, all: projectsAll },
        role,
    } = useSelector((state) => ({ 
        projects: state.projects,
        role: state.profile.auth.role
    }));
    const [popupFormControlConfig, updatePopupFormControlConfig] = useState({
        isOpen: false,
        text: '',
        firstBtn: ''
    });
    
    const searchRef = useRef<HTMLInputElement>(null);
    const filterRef = useRef<HTMLInputElement>(null);
    const subscribedProjects = [{
        author: 'abc',
        title: 'Название',
        topic: 'Тема',
        complexity: 'Сложность',
        lifetime: 'Срок проекта',
        description: 'Описание проекта'
    }]

    const doSearch = (e) => {
        const value = e.target?.value;
        const searchedData = projectsToShow.filter((el: IProject) => {
            const keys = Object.keys(el);
            for (const key of keys) {
                // @ts-ignore
                if (el[key].toLowerCase().match(value.toLowerCase())) {
                    return true;
                }
                continue;
            };
            return false;
        });
        updateProjectsToShow(searchedData)
    };

    const openSubscribedProjects = () => {
        dispatch(setIsOpenSubscribedProjects(true));
        dispatch(setStage(1));
        dispatch(updateMainMenuFlag(false));
        dispatch(changeBackBtnVisability(false));
        dispatch(updateButtons([{
            id: 1,
            onClick: () => {
                dispatch(setStage(0));
                dispatch(updateMainMenuFlag(true));
                dispatch(changeBackBtnVisability(true));
                dispatch(setIsOpenSubscribedProjects(false));
                updateProjectsToShow(projectsAll);
            },
        }]));
        updateProjectsToShow(subscribedProjects);
    };

    if (isOpenSubscridebProjects && subscribedProjects && subscribedProjects.length > 0) {
        return <WidgetWith2Items $transparent>
            <Left width='auto'>
                <StandartInput onChange={debounce(doSearch, 300)} ref={searchRef} $bordered placeholder='Поиск'/>
            </Left>
        </WidgetWith2Items> 
    };
    return <WidgetWith2Items $transparent>
        <Left width='auto'>
            <Title>Проекты</Title>
            <StandartInput id='search-projects' onChange={debounce(doSearch, 300)} ref={searchRef} $bordered placeholder='Поиск'/>
            <StandartInput id='filter-projects' onChange={debounce(doSearch, 300)} ref={filterRef} style={{ marginLeft: 20 }} $bordered placeholder='Фильтр'/>
        </Left>
        <Right>
            <ProjectsListControls
                role={role}
                controlRoleActions={{ students: openSubscribedProjects }}
                updatePopupConfig={updatePopupFormControlConfig}
                popupConfig={popupFormControlConfig}
            />
        </Right>
    </WidgetWith2Items>
};

export default ProjectsControls;