import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import { setDeleteModule } from '~/src/features/store/projectModule';

interface IProps {
    isOpen: boolean,
    updateIsOpen: Dispatch<SetStateAction<any>>,
    projectId: number,
};

const DeleteModulePopup = ({ isOpen, updateIsOpen, projectId }: IProps): JSX.Element | null => {
    const dispatch = useDispatch();
    const onDelete = () => {
        dispatch(setDeleteModule(projectId));
    }
    return <StandartPopupWithContent
        height='auto'
        isOpen={isOpen}
        updateIsOpen={updateIsOpen}
        text='Вы действительно хотите удалить выбранный модуль ?'
        firstBtn='Удалить'
        firstBtnOnClick={onDelete}
    >
    </StandartPopupWithContent>
};

export default DeleteModulePopup;