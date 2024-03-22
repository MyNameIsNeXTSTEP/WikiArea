import { useRef, useState } from 'react';
import * as ST from './styled';
import ProjectLogo from '~/src/assets/svg/ProjectSlug.svg';
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { Left, Right } from "~/src/UI-shared/Atoms/Containers";
import { ProjectImage } from '~/src/UI-shared/Atoms/icons';
import { StandartInput } from '~/src/UI-shared/Atoms/Inputs';
import { StandartLabel } from '~/src/UI-shared/Atoms/Labels';
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { Title } from "~/src/UI-shared/Tokens";
import { debounce } from '~/src/a-lib';
import { useSelector } from 'react-redux';
import StandartPopupWithContent from '~/src/Components/Popup/StandartPopupWithContent';

interface IProject {
    id: number,
    author: string,
    title: string,
    topic: string,
    complexity: string,
    lifetime: string,
    description: string,
}

interface IProjectDetails {
    isOpen: boolean,
    project: IProject,
}

const ProjectsPage = (): JSX.Element => {
    // const projectsData = useSelector(state => state.projects.all);
    const [isShowSubscribedProjects, showSubscribedProjects] = useState(false);
    const [isOpenUnsubsribePopup, openUnsubscribePopup] = useState(false);
    const [projectDetails, openProjectDetails] = useState({} as IProjectDetails);
    const searchRef = useRef<HTMLInputElement>(null);
    const filterRef = useRef<HTMLInputElement>(null);
    // const subscribedProjects = useSelector(state => state.projects.subscribed);
    // @todo: Change to selectors data from store
    const projectData = new Array(10).fill({
        id: 1,
        author: 'Автор',
        title: 'Название',
        topic: 'Тема',
        complexity: 'Сложность',
        lifetime: 'Срок проекта',
        description: 'Описание проекта'
    });
    projectData.push({
        id: 2,
        author: 'abc',        
        title: 'Название',
        topic: 'Тема',
        complexity: 'Сложность',
        lifetime: 'Срок проекта',
        description: 'Описание проекта'
    });
    const [projectsToShow, updateProjectsToShow] = useState(projectData)
    // const [data, updateData] = useState(projectsToShow);
    const subscribedProjects = [{
        author: 'abc',
        title: 'Название',
        topic: 'Тема',
        complexity: 'Сложность',
        lifetime: 'Срок проекта',
        description: 'Описание проекта'
    }]
    //
    const doSearch = (e) => {
        const value = e.target?.value;
        const searchedData = projectsToShow.filter((el: Record<string, string>) => {
            const keys = Object.keys(el);
            for (const key of keys) {
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
        showSubscribedProjects(true)
        updateProjectsToShow(subscribedProjects);
    };

    // @todo: [BUG] when do searching the inout field rerenders and projects filtering went wrong (?)
    const ProjectsControls = (): JSX.Element => {
        if (isShowSubscribedProjects && subscribedProjects && subscribedProjects.length > 0) {
            return <WidgetWith2Items $transparent>
                <Left width='auto'>
                    <StandartInput onChange={debounce(doSearch, 300)} ref={searchRef} $bordered placeholder='Поиск'/>
                </Left>
            </WidgetWith2Items> 
        };
        return <WidgetWith2Items $transparent>
            <Left width='auto'>
                <Title>Проекты</Title>
                <StandartInput onChange={debounce(doSearch, 300)} ref={searchRef} $bordered placeholder='Поиск'/>
                <StandartInput onChange={debounce(doSearch, 300)} ref={filterRef} style={{ marginLeft: 20 }} $bordered placeholder='Фильтр'/>
            </Left>
            <Right>
                <StandartButton $width='180px' onClick={openSubscribedProjects}>Мои проекты</StandartButton>
            </Right>
        </WidgetWith2Items>
    };

    const SubscribedProjects = (project?: IProject): JSX.Element | null => {
        if (!project) {
            return null;
        }
        return <WidgetWith2Items $rounded height='100px'>
                <Left style={{ flexDirection: 'column', display: 'flex' }}className="left">
                    <ST.ImageBlock style={{ marginTop: '10px' }}className="profile-block">
                        <ProjectImage src={ProjectLogo} />
                    </ST.ImageBlock>
                    <ST.ProjectsData>
                        {Object.values(project.project).map((data: string) => <StandartLabel $white>{data}</StandartLabel>)}
                    </ST.ProjectsData>
                    <StandartLabel style={{ alignSelf: 'flex-start' }} $white>Подписано:</StandartLabel>
                </Left>
                <Right className="right" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <StandartButton
                        $whiteBordered
                        $width={'180px'}
                        className="subscribtion"
                        onClick={() => openProjectDetails({ isOpen: true, project: project })}
                    >
                        Просмотр
                    </StandartButton>
                    <StandartButton $whiteBordered $width={'180px'} className="subscribtion" onClick={openUnsubscribePopup}>Отписаться</StandartButton>
                </Right>
            </WidgetWith2Items>
    };

    const AllProjects = (project?: IProject): JSX.Element | null => {
        if (!project) {
            return null;
        }
        return <WidgetWith2Items $rounded height='100px'>
                <Left className="left">
                    <ST.ImageBlock className="profile-block">
                        <ProjectImage src={ProjectLogo} />
                    </ST.ImageBlock>
                    <ST.ProjectsData>
                        {Object.values(project.project).map((data: string) => <StandartLabel $white>{data}</StandartLabel>)}
                    </ST.ProjectsData>
                </Left>
                <Right className="right">
                    <StandartButton $whiteBordered $width={'180px'} className="subscribtion">Подписаться</StandartButton>
                    <StandartLabel style={{ marginLeft: 20 }} $white>Подписано:</StandartLabel>
                </Right>
            </WidgetWith2Items>
    };

    const ProjectDetails = (project: IProject): JSX.Element | null => {
        console.log(project, 'detail');
        
        if (!project) {
            return null;
        }
        return <WidgetWith2Items $rounded height='100px'>
                <Left className="left">
                    <ST.ImageBlock className="profile-block">
                        <ProjectImage src={ProjectLogo} />
                    </ST.ImageBlock>
                    <ST.ProjectsData>
                        {Object.values(project.project.project).map((data: string) => <StandartLabel $white>{data}</StandartLabel>)}
                    </ST.ProjectsData>
                </Left>
            </WidgetWith2Items>
    };

    const GeneralProjectsList = (): JSX.Element | null => {
        return !projectDetails.isOpen && <>
            {projectsToShow.length
                ? projectsToShow.map((el: IProject) => 
                    isShowSubscribedProjects
                        ? <SubscribedProjects project={el}/>
                        : <AllProjects project={el}/>
                )
                : "Совпадений не найдено"
            }
            {isOpenUnsubsribePopup &&
                <StandartPopupWithContent
                    isOpen={isOpenUnsubsribePopup}
                    updateIsOpen={openUnsubscribePopup}
                    text='Вы действительно хотите отписатья от проекта ?'
                    firstBtn='Отписаться'
                />
            }
        </> || null;
    }

    return <>
        <ProjectsControls/>
        <GeneralProjectsList/>
        { projectDetails.isOpen && <ProjectDetails project={projectDetails.project}/> }
    </>
};

export default ProjectsPage;