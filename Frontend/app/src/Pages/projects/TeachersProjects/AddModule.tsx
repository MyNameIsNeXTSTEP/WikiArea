import * as ST from '../Components/Project-modules/styled';
import { StandartButton } from "@ui/Atoms/Buttons";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import TaskMaterials from '../Components/Project-modules/TaskMaterials';
import { useState } from 'react';
import AddModuleTaskPopup from '../Components/Project-modules/AddModuleTaskPopup';
import SelfSufficiencyTask from '../Components/Project-modules/SelfSufficientTask';
import { TRequestMethod } from '@api-package/types';
import APIRequest from '@api-package/index';
import { getCookie } from '~/src/helpers';
import DeleteModulePopup from '../Components/Project-modules/DeleteModulePopup';
import { setChangeAddTestsOpen } from '~/src/features/store/projects';
import { useDispatch } from 'react-redux';

interface IProps {
    projectId: number,
};

type TFileForReq = {
    buffToSave: string | ArrayBuffer | null,
    name: string,
    type: string,
};

const AddModule = ({ projectId }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const [isOpenTaskMaterials, setIsOpenTaskMaterials] = useState(false);
    const [isOpenAddModuleTaskPopup, setIsOpenAddModuleTask] = useState(false);
    const [isOpenDeleteModulePopup, setIsOpenDeleteModulePopup] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({} as TFileForReq);
    
    const processUploadedFile = (files: FileList | null) => { // @todo: fix the bug when form isn't submotable on the first click (async usaState issue)
        if (!files) throw new Error('No image was found in the request form');
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = () => setUploadedFile({
            buffToSave: reader.result,
            name: files[0].name,
            type: files[0].type.replace('text/', '')
        });
    };
    const request = () => {
        const accessToken = getCookie('access_token');
        const request = {
            uri: '/api/upload-module-file',
            method: TRequestMethod.POST,
            headers: {
                'X-Auth-Token': 'empty'
            },
            body: JSON.stringify({
                file: uploadedFile
            })
        };
        if (accessToken && accessToken !== String(undefined) && accessToken?.length > 0) {
            request.headers = {
                'X-Auth-Token': accessToken
            };
        };
        return request;
    };
    const handleUploadBtn = async () => {
        document.getElementById('upload-module-file')?.click();
        setIsOpenTaskMaterials(true);
        if (uploadedFile) {
            console.log(uploadedFile);
            await new APIRequest(request()).doRequest();
        }
    };
    return <>
        <WidgetWith2Items $rounded height='150px'>
            <ST.StyledTtitle $white>{projectId}.</ST.StyledTtitle>
            <ST.ModuleInput
                name={'module-name'}
                placeholder="Название модуля"
            />
            <ST.ButtonsLeft height='50%' width='25%' className="left">
                <ST.StyledButtonRow1>
                    <StandartButton $whiteBordered $width="200px" onClick={() => dispatch(setChangeAddTestsOpen(true))}>Добавить тест</StandartButton>
                    <StandartButton $whiteBordered $width="200px" onClick={() => setIsOpenAddModuleTask(true)}>Добавить задание</StandartButton>
                </ST.StyledButtonRow1>
            </ST.ButtonsLeft>
            <ST.ButtonsRight width='25%'>
                <ST.StyledButtonRow2 style={{ width: '440px'}}>
                    <StandartButton $whiteBordered $width="240px" onClick={handleUploadBtn}>
                        Добавить материал
                        <input
                            type='file'
                            id='upload-module-file'
                            style={{ display: 'none' }}
                            onChange={event => processUploadedFile(event.target.files)}
                        />
                        </StandartButton>
                    <StandartButton $whiteBordered $width="200px" onClick={() => setIsOpenDeleteModulePopup(true)}>Удалить модуль</StandartButton>
                </ST.StyledButtonRow2>
            </ST.ButtonsRight>
        </WidgetWith2Items>
        <TaskMaterials isOpen={isOpenTaskMaterials} projectId={projectId}/>
        { isOpenTaskMaterials && <SelfSufficiencyTask/> }
        <AddModuleTaskPopup
            projectId={projectId}
            isOpen={isOpenAddModuleTaskPopup}
            updateIsOpen={setIsOpenAddModuleTask}
        />
        <DeleteModulePopup
            isOpen={isOpenDeleteModulePopup}
            updateIsOpen={setIsOpenDeleteModulePopup}
            projectId={projectId}
        />
    </>
};

export default AddModule;