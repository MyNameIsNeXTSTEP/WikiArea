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

type TFormRequest = Record<string, any>

interface IProps {
    projectId: number,
}

const ProjectEditWidget = ({ projectId }: IProps): JSX.Element => {
    const [formFields, setFormFields] = useState({} as TFormRequest);
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        let collectedFormFields = {} as TFormRequest;
        formData.forEach((value, property: string) => {
            collectedFormFields[property] = value;
        });
        collectedFormFields['id'] = projectId;
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

    return <>
        <WidgetWith2Items $rounded height='200px'>
            <Left height='100%' className="left" style={{ display: 'flex' }}>
                <ImageBlock $abs width='130px' className="profile-block" style={{ alignSelf: 'center' }}>
                    <ProjectImage src={ProjectLogo} />
                </ImageBlock>
                <ST.Form id='edit-project-form' onSubmit={formSubmit} style={{ alignSelf: 'center' }}>
                    <Left width='300px'>
                        <StandartInput name={'name'} placeholder="Названи проекта" />
                        <StandartInput name={'topic'} placeholder="Тема"/>
                        <StandartInput name={'deadline'} placeholder="Сроки проекта"/>
                    </Left>
                    <Right width='300px'>
                        <StandartInput name={'complexity'} placeholder="Уровень сложности проекта"/>
                        <StandartInput height='65px' name={'description'} placeholder="Опиание проекта"/>
                        <StandartButton $whiteBordered>
                            Сохранить
                        </StandartButton>
                    </Right>
                </ST.Form>
            </Left>
            {/* <Right className="right">
            </Right> */}
        </WidgetWith2Items>
    </>
};

export default ProjectEditWidget;