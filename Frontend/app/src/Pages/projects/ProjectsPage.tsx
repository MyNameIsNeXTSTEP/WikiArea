import { useEffect, useRef, useState } from 'react';
import * as ST from './styled';
import ProjectLogo from '~/src/assets/svg/ProjectSlug.svg';
import Arrow from '~/src/assets/svg/Arrow.svg';
import File from '~/src/assets/svg/File.svg';
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { BoundedContainer, ButtonRow, Left, Right } from "~/src/UI-shared/Atoms/Containers";
import { DropdownArrow, FileIcon, ImageBlock, ProjectImage } from '~/src/UI-shared/Atoms/icons';
import { StandartInput } from '~/src/UI-shared/Atoms/Inputs';
import { StandartLabel } from '~/src/UI-shared/Atoms/Labels';
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { H1, Title } from "~/src/UI-shared/Tokens";
import { debounce } from '~/src/a-lib'
import { useDispatch, useSelector } from 'react-redux';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import { SimpleWidget } from '~/src/UI-shared/Organisms/Widgets/SimpleWidget';
import ModuleTests from './ModuleTests';
import { TRequestMethod } from '@api-package/types';
import APIRequest from '@api-package/index';
import ProjectsListControls from './ProjectControls/ProjectsListControls';
import { IProject } from '~/src/a-lib';
import { setDeletedProjects, setIsOpenSubscribedProjects, setProjectDetailsPage, setProjectsAll } from '~/src/features/store/projects';
import Menu from '~/src/UI-shared/Organisms/Menu';
import GeneralProjectsList from './GeneralProjectsList';

interface IModule {
    projectModule: {
        name: string
    }
}

const ProjectsPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const role = useSelector(state => state.profile.auth.role);
    const { projects, isOpenShowSubscridebProjects, projectDetailsPage } = useSelector(state => state.projects);
    const [isModuleTestsOpen, openModuleTests] = useState(false);
    const [projectsToShow, updateProjectsToShow] = useState(projects)
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
    const projectModules = [
        { name: 'Первый модуль' },
        { name: 'Второй модуль' },
        { name: 'Третий модуль' },
    ];
    
    useEffect(() => {
        const requestAll = {
            uri: '/api/projects/get-all',
            method: TRequestMethod.GET,
        };
        (async () => {
            await new APIRequest(requestAll)
                .doRequest()
                .then(res => dispatch(setProjectsAll(res.payload)));
        })();
        const requestDeleted = {
            uri: '/api/projects/get-deleted',
            method: TRequestMethod.GET,
        };
        (async () => {
            await new APIRequest(requestDeleted)
                .doRequest()
                .then(res => dispatch(setDeletedProjects(res.payload)));
        })();
    }, [])

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
        dispatch(setIsOpenSubscribedProjects(true));
        updateProjectsToShow(subscribedProjects);
    };

    // @todo: [BUG] when do searching the inout field rerenders and projects filtering went wrong (?)
    const ProjectsControls = (): JSX.Element => {
        const controlRoleActions = {
            students: openSubscribedProjects,
        };

        if (isOpenShowSubscridebProjects && subscribedProjects && subscribedProjects.length > 0) {
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
                    controlRoleActions={controlRoleActions}
                    updatePopupConfig={updatePopupFormControlConfig}
                    popupConfig={popupFormControlConfig}
                />
            </Right>
        </WidgetWith2Items>
    };

    const ProjectDetails = (project: IProject): JSX.Element | null => {
        if (!project) {
            return null;
        }
        return <WidgetWith2Items $rounded height='100px'>
                <Left className="left">
                    <ImageBlock $abs className="profile-block">
                        <ProjectImage src={ProjectLogo} />
                    </ImageBlock>
                    <ST.ProjectsData>
                        {Object.values(project.project.project).map((data: string) => <StandartLabel $white>{data}</StandartLabel>)}
                    </ST.ProjectsData>
                </Left>
            </WidgetWith2Items>
    };

    const ProjectModule = ({ projectModule }: IModule): JSX.Element => {
        type TFileForReq = {
            buffToSave: string | ArrayBuffer | null,
            name: string,
            type: string,
        };
        const [isDropDownOpen, openDropDown] = useState(false);
        const [isOpenFileUploadPopup, openFileUploadPopup] = useState(false);
        const [uploadedFile, setUploadedFile] = useState({} as TFileForReq);
        const openTests = () => {
            openModuleTests(true);
            dispatch(setProjectDetailsPage({ isOpen: false }));
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
        };
        const MenuAfterRedirect = (): JSX.Element | null => {
            if (document.getElementsByClassName('main-menu').length === 0) {
                return <Menu className="main-menu"/>
            }
            return null;
        }
        return <>
            <MenuAfterRedirect/>
            <WidgetWith2Items $rounded height='80px'>
                <Left><H1 $white>{projectModule && projectModule.name || 'Text'}</H1></Left>
                <Right>
                    <ImageBlock style={{ marginTop: '10px' }}className="profile-block">
                        <DropdownArrow src={Arrow} flip={isDropDownOpen} onClick={() => openDropDown(!isDropDownOpen)}/>
                    </ImageBlock>
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
        { projectDetailsPage.isOpen && <ProjectDetails project={projectDetailsPage.project}/> }
        { projectDetailsPage.isOpen && projectModules.map(el => <ProjectModule projectModule={el}/>) }
        { isModuleTestsOpen && <ModuleTests/> }
    </>
};

export default ProjectsPage;
