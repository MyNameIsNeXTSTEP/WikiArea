import * as ST from './styled';
import { Left, Right } from '~/src/UI-shared/Atoms/Containers';
import { SimpleWidget } from '~/src/UI-shared/Organisms/Widgets/SimpleWidget';

interface IProps {
    isOpen: boolean,
}

const TaskMaterials = ({ isOpen }: IProps): JSX.Element | null => {
    return isOpen
        ? <SimpleWidget $bordered height='150px' $autoMargins $relative>
            <ST.TaskMaterialsInput
                $noShifts
                $bordered
                width='99%'
                height='30px'
                name={'module-task'}
                placeholder="Задание модуля"
            />
            <ST.PlainFlexContainer>
                <Left width='90%'>
                    <ST.StyledTtitle>123</ST.StyledTtitle>
                </Left>
                <Right width='10%'>
                    <ST.TaskMaterialsDeleteButton $whiteBordered $width="120px">Удалить</ST.TaskMaterialsDeleteButton>
                </Right>
            </ST.PlainFlexContainer>
        </SimpleWidget>
        : null
};

export default TaskMaterials;