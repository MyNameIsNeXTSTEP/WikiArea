import { useDispatch, useSelector } from 'react-redux';
import ProjectEditWidget from './ProjectEditWidget';
import { useEffect, useState } from 'react';
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from '~/src/features/store/menu';
import { setChangeAddTestsOpen, setIsOpenEditProjectPage } from '~/src/features/store/projects';
import { StandartButton } from '@ui/Atoms/Buttons';
import AddModule from '../../TeachersProjects/AddModule';
import { ButtonRow } from '@ui/Atoms/Containers';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import AddTests from './AddTests';

const EditProjectPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const {
        projects: {
            projectIdOnEdit,
            isAddTestsOpen,
        }
    } = useSelector(state => ({
        projects: state.projects
    }));
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
    }, []);

    const ConfirmExitPopup = (): JSX.Element => {
        return <StandartPopupWithContent
            height='300px'
            isOpen={isOpenConfirmExitPopup}
            updateIsOpen={setIsOpenConfirmExitPopup}
            text='Вы не сохранили введённые вами данные. Они могут быть утеряны.'
            firstBtn='Выйти'
            firstBtnOnClick={() => {
                dispatch(setChangeAddTestsOpen(false));
                dispatch(setIsOpenEditProjectPage(false));
            }}
        />
    };

    return <>
        { !isAddTestsOpen && <>
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
            </>
        }
        { isOpenAddModuleBlock && <AddModule projectId={projectIdOnEdit}/>}
        { isOpenConfirmExitPopup && <ConfirmExitPopup/>}
        { isAddTestsOpen && <AddTests/> }
    </>
};

export default EditProjectPage;