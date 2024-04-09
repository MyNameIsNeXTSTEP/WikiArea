import { useDispatch, useSelector } from 'react-redux';
import ProjectEditWidget from './ProjectEditWidget';
import { useEffect } from 'react';
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from '~/src/features/store/menu';
import { setIsOpenEditProjectPage } from '~/src/features/store/projects';
import { StandartButton } from '~/src/UI-shared/Atoms/Buttons';
import AddModule from '../ProjectModules/AddModule';

const EditProjectPage = (): JSX.Element => {
    const dispatch = useDispatch();
    const projectIdOnEdit = useSelector(state => state.projects.projectIdOnEdit);
    useEffect(()=> {
        dispatch(updateMainMenuFlag(false));
        dispatch(changeBackBtnVisability(false));
        dispatch(updateButtons([{
            id: 1,
            onClick: () => dispatch(setIsOpenEditProjectPage(false)),
            src: 'Back',
        }]));
    }, [projectIdOnEdit])
    return <>
        <ProjectEditWidget projectId={projectIdOnEdit}/>
        <StandartButton
            $width='200px'
            style={{
                right: '180px',
                position: 'absolute'
            }}
            onClick={() => alert(1)}
        >
            Добавить модуль
        </StandartButton>
        <AddModule/>
    </>
};

export default EditProjectPage;