import { useDispatch, useSelector } from 'react-redux';
import { config } from './config';
import { StandartButton } from '@ui/Atoms/Buttons';
import { StandartLabel } from '@ui/Atoms/Labels';
import { useState } from 'react';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import { setIsOpenEditProjectPage, setProjectIdOnEdit, setStage } from '~/src/features/store/projects';
import { EUserRoles, IProject } from '~/src/a-lib';
import APIRequest from '@api-package/index';
import { TRequestMethod } from '@api-package/types';

interface IProps {
    project: IProject;
}

const Controls = ({ project }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const { role, email } = useSelector(state => state.profile.auth);
    const [isOpenTecherDeleteProjectPopup, setIsOpenTecherDeleteProjectPopup] = useState(false);
    const controlState = config[role];
    const openEditProjectPage = () => {
        dispatch(setStage(2));
        dispatch(setIsOpenEditProjectPage(true));
        dispatch(setProjectIdOnEdit(project.id));
    };
    const openDetailedAdminsProjectsPage = () => {
        alert(1)
        // dispatch(setProjectIdOnEdit(project.id));
    }
    const subscribeToProject = async () => {
        const res = await new APIRequest({
            uri: '/api/users/subscribe-to-project',
            method: TRequestMethod.PUT,
            body: JSON.stringify({ email, projectId: project.id }),
        }).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            return;
        }
    };
    const roleAction = () => {
        switch (role) {
            case EUserRoles.student:
                subscribeToProject().then();
                return
            case EUserRoles.teacher:
                openEditProjectPage();
                return;
            case EUserRoles.admin:
                openDetailedAdminsProjectsPage();
                return;
            default:
                break;
        }
    };
    return <>
        {controlState.option1.type === 'button' &&
            <StandartButton
                $whiteBordered $width={'180px'}
                onClick={roleAction}
            >
                {controlState.option1.buttonText}
            </StandartButton>
        }
        {controlState.option2.type === 'label' && 
            <StandartLabel style={{ marginLeft: 20 }} $white>
                {controlState.option2.label}
            </StandartLabel>
        }
        {controlState.option2.type === 'button' && 
            <StandartButton $whiteBordered $width={'180px'} style={{ marginLeft: 20 }}
                onClick={() => setIsOpenTecherDeleteProjectPopup(true)}
            >
                {controlState.option2.buttonText}
            </StandartButton>
        }
        <StandartPopupWithContent 
            isOpen={isOpenTecherDeleteProjectPopup}
            updateIsOpen={setIsOpenTecherDeleteProjectPopup}
            text='Вы действительно хотите удалить выбраный проект'
            firstBtn='Удалить'
        />
    </>
};

export default Controls; 