import { useDispatch, useSelector } from 'react-redux';
import ProjectEditWidget from './ProjectEditWidget';
import { useEffect, useState } from 'react';
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from '~/src/features/store/menu';
import { setIsOpenEditProjectPage } from '~/src/features/store/projects';
import { StandartButton } from '~/src/UI-shared/Atoms/Buttons';
import AddModule from '../ProjectModules/AddModule';
import { ButtonRow } from '~/src/UI-shared/Atoms/Containers';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';

const EditProjectPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const projectIdOnEdit = useSelector(state => state.projects.projectIdOnEdit);
    const [isOpenAddModuleBlock, setIsOpenAddModuleBlock] = useState(false);
    const [isOpenConfirmExitPopup, setIsOpenConfirmExitPopup] = useState(false);
    useEffect(()=> {
        dispatch(updateMainMenuFlag(false));
        dispatch(changeBackBtnVisability(false));
        dispatch(updateButtons([{
            id: 1,
            onClick: () => {
                setIsOpenConfirmExitPopup(true);
            },
            src: 'Back',
        }]));
    }, [projectIdOnEdit]);
    console.log(isOpenConfirmExitPopup);

    const ConfirmExitPopup = (): JSX.Element => {
        return <StandartPopupWithContent
          height='300px'
          isOpen={isOpenConfirmExitPopup}
          updateIsOpen={setIsOpenConfirmExitPopup}
          text='Вы не сохранили введённые вами данные. Они могут быть утеряны.'
          firstBtn='Выйти'
          firstBtnOnClick={() => dispatch(setIsOpenEditProjectPage(false))}
        />
    }

    return <>
        <ProjectEditWidget projectId={projectIdOnEdit}/>
        <ButtonRow width='80%'
            style={{
                marginRight: 'auto',
                marginLeft: 'auto',
            }}
        >
            <StandartButton
                $width='200px'
                style={{
                    right: '180px',
                    marginLeft: 'auto'
                }}
                onClick={() => setIsOpenAddModuleBlock(true)}
            >
                Добавить модуль
            </StandartButton>
        </ButtonRow>
        { isOpenAddModuleBlock && <AddModule projectId={projectIdOnEdit}/>}
        { isOpenConfirmExitPopup && <ConfirmExitPopup/>}
    </>
};

export default EditProjectPage;