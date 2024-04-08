import { useDispatch, useSelector } from 'react-redux';
import ProjectEditWidget from './ProjectEditWidget';
import { useEffect } from 'react';
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from '~/src/features/store/menu';
import { setIsOpenEditProjectPage } from '~/src/features/store/projects';

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
    }, [])
    return <>
        <ProjectEditWidget projectId={projectIdOnEdit}/>
    </>
};

export default EditProjectPage;