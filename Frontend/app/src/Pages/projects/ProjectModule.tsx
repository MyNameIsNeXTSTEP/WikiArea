import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import Menu from "@ui/Organisms/Menu";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { setProjectDetailsPage } from "~/src/features/store/projects";
import { Arrow, File } from '@ui/assets/svg';
import { StandartButton } from "@ui/Atoms/Buttons";
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import { SimpleWidget } from '@ui/Organisms/Widgets/SimpleWidget';
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { BoundedContainer, ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { H1, Title } from "@ui/Tokens";
import { DropdownArrow, FileIcon, ImageBlock } from "@ui/Atoms/icons";
import { IModule, TFileForReq } from "~/src/a-lib";

interface IProps {
    projectModule: IModule,
    openModuleTests: Dispatch<SetStateAction<Boolean>>,
}

const ProjectModule = ({ projectModule, openModuleTests }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const [isDropDownOpen, openDropDown] = useState(false);
    const [isOpenFileUploadPopup, openFileUploadPopup] = useState(false);
    const [uploadedFile, setUploadedFile] = useState({} as TFileForReq);
    const onOpenTests = () => {
        openModuleTests(true);
        dispatch(setProjectDetailsPage({ isOpen: false }));
    };
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
    const uploadFileRequest = {
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
        await new APIRequest(uploadFileRequest).doRequest();
    };
    const handleUploadBtn = () => {
        openFileUploadPopup(true);
        document.getElementById('upload-file')?.click();
    };
    return <>
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
                        : <StandartButton $width='200px' className="take-test-button" onClick={onOpenTests}>Пройти тест</StandartButton>
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
                                    onChange={event => processUploadedFile(event.target.files)}
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

export default ProjectModule;
