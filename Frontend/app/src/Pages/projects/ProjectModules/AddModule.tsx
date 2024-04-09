import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { ButtonRow, Left, Right } from "~/src/UI-shared/Atoms/Containers";
import { StandartInput } from "~/src/UI-shared/Atoms/Inputs";
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { Title } from "~/src/UI-shared/Tokens";

interface IProps {
    projectId: number,
}

const AddModule = ({ projectId }: IProps): JSX.Element => {
    return <>
        <WidgetWith2Items $rounded height='150px'>
            <Title $white style={{ marginLeft: '20px'}}>{projectId}.</Title>
            <StandartInput
                name={'name'}
                placeholder="Название модуля"
                style={{
                    position: 'absolute',
                    left: '0',
                    marginLeft: '50px',
                }}
            />
            <Left height='50%' width='25%'
                style={{
                    position: 'absolute',
                    right: '230px',
                    marginBottom: '30px',
                }}
                className="left"
            >
                <ButtonRow style={{ width: '400px'}}>
                    <StandartButton $whiteBordered $width="200px">Добавить тест</StandartButton>
                    <StandartButton $whiteBordered $width="200px">Добавить задание</StandartButton>
                </ButtonRow>
            </Left>
            <Right width='25%'
                style={{
                    position: 'absolute',
                    right: '230px',
                }}
            >
                <ButtonRow style={{ width: '440px'}}>
                    <StandartButton $whiteBordered $width="240px">Добавить материал</StandartButton>
                    <StandartButton $whiteBordered $width="200px">Удалить модуль</StandartButton>
                </ButtonRow>
            </Right>
        </WidgetWith2Items>
    </>
};

export default AddModule;