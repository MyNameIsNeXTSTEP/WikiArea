import { Left, Right } from '@ui/Atoms/Containers';
import * as ST from './styled';
import { SimpleWidget } from "@ui/Organisms/Widgets/SimpleWidget";

const SelfSufficiencyTask = (): JSX.Element => {
    return <SimpleWidget $bordered height='80px' $autoMargins $relative>
        <ST.PlainFlexContainer>
            <Left width='90%'>
                <ST.StyledTtitle>Самостоятельное задание</ST.StyledTtitle>
            </Left>
            <Right width='10%'>
                <ST.TaskMaterialsDeleteButton $whiteBordered $width="120px">Удалить</ST.TaskMaterialsDeleteButton>
            </Right>
        </ST.PlainFlexContainer>
    </SimpleWidget>
};

export default SelfSufficiencyTask;