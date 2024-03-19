import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { Right, Left } from "~/src/UI-shared/Atoms/Containers/index";
import { H1Description } from "~/src/UI-shared/Tokens/components";
import { Input } from './styled';
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";

const AdditionalDataControl = (): JSX.Element => {
    return <>
      <WidgetWith2Items height={'200px'} $rounded>
        <Left className="left">
            <H1Description $white text={'Дополнительные данные'}/>
        </Left>
        <Right className="right">
            <Input $bordered placeholder="Смена почты…"/>
            <Input $bordered placeholder="Смена логина…"/>
            <StandartButton $whiteBordered className="delete-button">Сохранить</StandartButton>
        </Right>
      </WidgetWith2Items>
    </>
};

export default AdditionalDataControl;