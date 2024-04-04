import { useRef, useState } from 'react';
import * as ST from './styled';
import ProjectLogo from '~/src/assets/svg/ProjectSlug.svg';
import Arrow from '~/src/assets/svg/Arrow.svg';
import File from '~/src/assets/svg/File.svg';
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { BoundedContainer, ButtonRow, Left, Right } from "~/src/UI-shared/Atoms/Containers";
import { DropdownArrow, FileIcon, ProjectImage } from '~/src/UI-shared/Atoms/icons';
import { StandartInput } from '~/src/UI-shared/Atoms/Inputs';
import { StandartLabel } from '~/src/UI-shared/Atoms/Labels';
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { H1, Title } from "~/src/UI-shared/Tokens";
import { debounce } from '~/src/a-lib';
import { useSelector } from 'react-redux';
import StandartPopupWithContent from '~/src/Components/Popup/StandartPopupWithContent';
import { SimpleWidget } from '~/src/UI-shared/Organisms/Widgets/SimpleWidget';
import ModuleTests from './ModuleTests';
import { TRequestMethod } from '@api-package/types';
import APIRequest from '@api-package/index';

interface IModule {
    projectModule: {
        name: string
    }
}

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
    project?: IProject,
}

const ProjectsPage = (): JSX.Element => {
    // const projectsData = useSelector(state => state.projects.all);
    const [isShowSubscribedProjects, showSubscribedProjects] = useState(false);
    const [isOpenUnsubsribePopup, openUnsubscribePopup] = useState(false);
    const [projectDetails, openProjectDetails] = useState({} as IProjectDetails);
    const [isModuleTestsOpen, openModuleTests] = useState(false);
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
    const projectModules = [
        { name: 'Первый модуль' },
        { name: 'Второй модуль' },
        { name: 'Третий модуль' },
    ];
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
                    <ST.ImageBlock $abs style={{ marginTop: '10px' }}className="profile-block">
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
                    <ST.ImageBlock $abs className="profile-block">
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
        if (!project) {
            return null;
        }
        return <WidgetWith2Items $rounded height='100px'>
                <Left className="left">
                    <ST.ImageBlock $abs className="profile-block">
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
    };

    const ProjectModule = ({ projectModule }: IModule): JSX.Element => {
        const accessToken = useSelector(state => state.profile.accessToken);
        type TFileForReq = {
            buffToSave: string | ArrayBuffer | null,
            name: string,
            type: string,
        };
        // const { testIsPassed } = useSelector(state => state.project.module.test);
        const [isDropDownOpen, openDropDown] = useState(false);
        const [isOpenFileUploadPopup, openFileUploadPopup] = useState(false);
        const [uploadedFile, setUploadedFile] = useState({} as TFileForReq);
        const openTests = () => {
            openModuleTests(true);
            openProjectDetails({ isOpen: false});
        };
        const processUploadedImage = (files: FileList | null) => { // @todo: fix the bug when form isn't submotable on the first click (async usaState issue)
            if (!files) throw new Error('No image was found in the request form');
            let reader = new FileReader();
            reader.readAsDataURL(files[0])
            reader.onload = () => setUploadedFile({
                buffToSave: reader.result,
                name: files[0].name,
                type: files[0].type.replace('text/', '')
            });
        };
        const request = {
            uri: '/api/upload-test-file',
            method: TRequestMethod.POST,
            headers: {
                'X-Auth-Token': ''
            },
            body: JSON.stringify({
                file: uploadedFile
            })
        };
        const uploadTestFile = async () => {
            await new APIRequest(request).doRequest();
        };
        const handleUploadBtn = () => {
            openFileUploadPopup(true);
            document.getElementById('upload-file')?.click();
        }
        return <>
            <WidgetWith2Items $rounded height='80px'>
                <Left><H1 $white>{projectModule && projectModule.name || 'Text'}</H1></Left>
                <Right>
                    <ST.ImageBlock style={{ marginTop: '10px' }}className="profile-block">
                        <DropdownArrow src={Arrow} flip={isDropDownOpen} onClick={() => openDropDown(!isDropDownOpen)}/>
                    </ST.ImageBlock>
                </Right>
            </WidgetWith2Items>
            { isDropDownOpen && <BoundedContainer>
                <SimpleWidget width='100%' height='auto' $bordered className='module-test'>
                    <WidgetWith2Items $fullWidth $smallMargins $transparent>
                        <Left><Title>Материал</Title></Left>
                        { false
                            ? <StandartButton $width='200px' className="take-test-button">Посмотреть итоги теста</StandartButton>
                            : <StandartButton $width='200px' className="take-test-button" onClick={openTests}>Пройти тест</StandartButton>
                        }
                        <Right>
                            <StandartButton className="download-button">Скачать</StandartButton>
                        </Right>
                    </WidgetWith2Items>
                </SimpleWidget>
            </BoundedContainer> }
            { isDropDownOpen && <BoundedContainer>
                <SimpleWidget width='100%' height='auto' $bordered>
                    <WidgetWith2Items $fullWidth $smallMargins $transparent height='auto'>
                        <SimpleWidget width='auto' height='auto'>
                            <Left><Title>Текст задания</Title></Left>
                            <Left><Title>Материал</Title></Left>
                        </SimpleWidget>
                        <Right>
                            <ButtonRow>
                                <StandartButton id="upload-button" onClick={handleUploadBtn}>
                                    Загрузить
                                    <input
                                        type='file'
                                        id='upload-file'
                                        style={{ display: 'none' }}
                                        onChange={event => processUploadedImage(event.target.files)}
                                    />
                                </StandartButton>
                                <StandartButton className="download-button">Удалить</StandartButton>
                            </ButtonRow>
                        </Right>
                    </WidgetWith2Items>
                </SimpleWidget>
            </BoundedContainer> }
            <StandartPopupWithContent
                isOpen={isOpenFileUploadPopup}
                updateIsOpen={openFileUploadPopup}
                text='Загрузить файл с заданием'
                firstBtn='Сохранить'
                image={<FileIcon src={File}/>}
                firstBtnOnClick={uploadTestFile}
            />
        </>
    };
    
    return <>
        {/* @todo: Use with steps from redux store to keep state of the components and page progress consistent */}
        <ProjectsControls/>
        { !isModuleTestsOpen && <GeneralProjectsList/> }
        { projectDetails.isOpen && <ProjectDetails project={projectDetails.project}/> }
        { projectDetails.isOpen && projectModules.map(el => <ProjectModule projectModule={el}/>) }
        { isModuleTestsOpen && <ModuleTests/> }
    </>
};

export default ProjectsPage;