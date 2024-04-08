import { useDispatch, useSelector } from 'react-redux';
import { config } from './config';
import { StandartButton } from '~/src/UI-shared/Atoms/Buttons';
import { StandartLabel } from '~/src/UI-shared/Atoms/Labels';
import { useState } from 'react';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import { setIsOpenEditProjectPage, setProjectIdOnEdit } from '~/src/features/store/projects';
import { IProject } from '~/src/a-lib';

interface IProps {
    project: IProject;
}

const Controls = ({ project }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const role = useSelector(state => state.profile.auth.role);
    const [isOpenTecherDeleteProjectPopup, setIsOpenTecherDeleteProjectPopup] = useState(false);
    const controlState = config[role];
    const openEditProjectPage = () => {
        dispatch(setIsOpenEditProjectPage(true));
        dispatch(setProjectIdOnEdit(project.id));
    }
    return <>
        {controlState.option1.type === 'button' &&
            <StandartButton
                $whiteBordered $width={'180px'}
                onClick={openEditProjectPage}
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
        {/* teacher */}
        <StandartPopupWithContent 
            isOpen={isOpenTecherDeleteProjectPopup}
            updateIsOpen={setIsOpenTecherDeleteProjectPopup}
            text='Вы действительно хотите удалить выбраный проект'
            firstBtn='Удалить'
        />
    </>
};

export default Controls; 