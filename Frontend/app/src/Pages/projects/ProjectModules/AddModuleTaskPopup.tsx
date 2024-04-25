import * as ST from './styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import { setProjectModulesAll } from '~/src/features/store/projectModule';

interface IProps {
    projectId: number,
    isOpen: boolean,
    updateIsOpen: Dispatch<SetStateAction<any>>,
};

const AddModuleTaskPopup = ({ projectId, isOpen, updateIsOpen }: IProps): JSX.Element | null => {
    const dispatch = useDispatch();
    const [taskModuleText, setTaskModuleText] = useState('');
    const handleAddClick = () => {
        dispatch(setProjectModulesAll({
            projectId,
            exercise: taskModuleText,
        }));
    };
    return <StandartPopupWithContent
        height='auto'
        isOpen={isOpen}
        updateIsOpen={updateIsOpen}
        text='Добавление задания'
        firstBtn='Добавить'
        firstBtnOnClick={handleAddClick}
    >
        <ST.AddTaskModuleText
            onChange={e => setTaskModuleText(e.currentTarget?.value)}
            placeholder='Задание'
        />
    </StandartPopupWithContent>
};

export default AddModuleTaskPopup;