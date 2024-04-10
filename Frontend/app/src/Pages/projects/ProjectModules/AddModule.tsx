import * as ST from './styled';
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import TaskMaterials from './TaskMaterials';
import { useState } from 'react';
import AddModuleTaskPopup from './AddModuleTaskPopup';
import SelfSufficiencyTask from './SelfSufficientTask';

interface IProps {
    projectId: number,
}

const AddModule = ({ projectId }: IProps): JSX.Element => {
    const [isOpenTaskMaterials, setIsOpenTaskMaterials] = useState(false);
    const [isOpenAddModuleTaskPopup, setIsOpenAddModuleTask] = useState(false);
    return <>
        <WidgetWith2Items $rounded height='150px'>
            <ST.StyledTtitle $white>{projectId}.</ST.StyledTtitle>
            <ST.ModuleInput
                name={'module-name'}
                placeholder="Название модуля"
            />
            <ST.ButtonsLeft height='50%' width='25%' className="left">
                <ST.StyledButtonRow1>
                    <StandartButton $whiteBordered $width="200px">Добавить тест</StandartButton>
                    <StandartButton $whiteBordered $width="200px" onClick={() => setIsOpenAddModuleTask(true)}>Добавить задание</StandartButton>
                </ST.StyledButtonRow1>
            </ST.ButtonsLeft>
            <ST.ButtonsRight width='25%'>
                <ST.StyledButtonRow2 style={{ width: '440px'}}>
                    <StandartButton $whiteBordered $width="240px" onClick={() => setIsOpenTaskMaterials(true)}>Добавить материал</StandartButton>
                    <StandartButton $whiteBordered $width="200px">Удалить модуль</StandartButton>
                </ST.StyledButtonRow2>
            </ST.ButtonsRight>
        </WidgetWith2Items>
        <TaskMaterials isOpen={isOpenTaskMaterials}/>
        { isOpenTaskMaterials && <SelfSufficiencyTask/> }
        <AddModuleTaskPopup
            projectId={projectId}
            isOpen={isOpenAddModuleTaskPopup}
            updateIsOpen={setIsOpenAddModuleTask}
        />
    </>
};

export default AddModule;