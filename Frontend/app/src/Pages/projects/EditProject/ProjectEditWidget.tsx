import * as ST from './styled';
import { StandartButton } from '~/src/UI-shared/Atoms/Buttons';
import { Left, Right } from "~/src/UI-shared/Atoms/Containers";
import { ImageBlock, ProjectImage } from '~/src/UI-shared/Atoms/icons';
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import ProjectLogo from '~/src/assets/svg/ProjectSlug.svg';
import { StandartInput } from '~/src/UI-shared/Atoms/Inputs';
import { TRequestMethod } from '@api-package/types';
import APIRequest from '@api-package/index';
import { useState } from 'react';
import { imageForFormReq } from '~/src/a-lib';
import { ComplexitySelector } from '../AddNewProject/InputSelectors';

type TFormRequest = Record<string, any>

interface IProps {
    projectId: number,
}

const ProjectEditWidget = ({ projectId }: IProps): JSX.Element => {
    const [formFields, setFormFields] = useState({} as TFormRequest);
    const [taskImageFile, updateTaskImageFile] = useState('');
    const [imageForReq, updateImageForReq] = useState({} as imageForFormReq);
    const [selectedComplexity, setSelectedComplexity] = useState('');
    const [isShowComplexitySelector, setIsShowComplexitySelector] = useState(false);
    
    const displayImage = (files: FileList | null) => files && updateTaskImageFile(URL.createObjectURL(files[0])) || null;

    const processUploadedImage = (files: FileList | null) => { // @todo: fix the bug when form isn't submitable on the first click (async usaState issue)
        if (!files) throw new Error('No image was found in the request form');
        displayImage(files);
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = () => updateImageForReq({
            imgBuffToSave: reader.result,
            imgName: files[0].name,
            type: files[0].type.replace('image/', '')
        });
    };

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        let collectedFormFields = {} as TFormRequest;
        formData.forEach((value, property: string) => {
            collectedFormFields[property] = value;
        });
        collectedFormFields['id'] = projectId;
        collectedFormFields['image'] = imageForReq;
        setFormFields(collectedFormFields);
        submitProjectChanges();
    };
    const submitProjectChanges = async () => {
        const request = {
            uri: '/api/projects/edit',
            method: TRequestMethod.POST,
            body: JSON.stringify(formFields)
        };
        const res = await new APIRequest(request).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            return;
        }
    };

    const openFileSelector = () => {
        document.getElementById('project-image-upload')?.click();
    };

    const selectComplexity = (selectedTopic: string) => {
        setSelectedComplexity(selectedTopic);
    };

    return <>
        <WidgetWith2Items $rounded height='200px'>
            <Left height='100%' className="left" style={{ display: 'flex' }}>
                <ImageBlock $abs width='130px' className="profile-block" style={{ alignSelf: 'center' }}>
                    <ProjectImage
                        src={taskImageFile.length ? taskImageFile : ProjectLogo}
                        onClick={openFileSelector}
                    />
                    <ST.ProjectImageUpload
                        type='file'
                        id='project-image-upload'
                        onChange={event => processUploadedImage(event.target.files)}
                    />
                </ImageBlock>
                <ST.Form id='edit-project-form' onSubmit={formSubmit} style={{ alignSelf: 'center' }}>
                    <Left width='300px'>
                        <StandartInput name={'name'} placeholder="Название проекта" />
                        <StandartInput name={'topic'} placeholder="Тема"/>
                        <StandartInput name={'deadline'} placeholder="Сроки проекта"/>
                    </Left>
                    <Right width='300px'>
                        <StandartInput
                            name={'projectComplexity'}
                            value={selectedComplexity}
                            placeholder="Уровень сложности проекта"
                            onClick={() => setIsShowComplexitySelector(!isShowComplexitySelector)}
                        />
                        <ComplexitySelector updateComplexity={selectComplexity} isOpen={isShowComplexitySelector}/>
                        <StandartInput height='65px' name={'description'} placeholder="Опиание проекта"/>
                        <StandartButton $whiteBordered>
                            Сохранить
                        </StandartButton>
                    </Right>
                </ST.Form>
            </Left>
        </WidgetWith2Items>
    </>
};

export default ProjectEditWidget;