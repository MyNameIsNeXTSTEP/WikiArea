import { useSelector } from 'react-redux';
import * as ST from './styled';
import { Left, Right } from '~/src/UI-shared/Atoms/Containers';
import { SimpleWidget } from '~/src/UI-shared/Organisms/Widgets/SimpleWidget';
import type { IProjectModule } from '~/src/a-lib';

interface IProps {
    isOpen: boolean,
    projectId: number,
}

const TaskMaterials = ({ isOpen, projectId }: IProps): JSX.Element | null => {
    const allModules = useSelector(state => state.modules.all);
    const currentModuleTask = allModules.filter((task: IProjectModule) => task.projectId === projectId);
    return isOpen && currentModuleTask
        ? <SimpleWidget $bordered height='150px' $autoMargins $relative>
            { currentModuleTask && <ST.TaskText $noShifts>
                {/* {currentModuleTask[currentModuleTask.length - 1].text} */}
            </ST.TaskText> }
            <ST.PlainFlexContainer>
                <Left width='90%'>
                    <ST.StyledTtitle>Материал </ST.StyledTtitle>
                </Left>
                <Right width='10%'>
                    <ST.TaskMaterialsDeleteButton $whiteBordered $width="120px">Удалить</ST.TaskMaterialsDeleteButton>
                </Right>
            </ST.PlainFlexContainer>
        </SimpleWidget>
        : null
};

export default TaskMaterials;