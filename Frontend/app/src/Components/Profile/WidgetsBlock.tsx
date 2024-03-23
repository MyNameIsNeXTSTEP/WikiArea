import * as ST from "./styled";
import Eye from "~/src/assets/svg/Eye.svg";
import { SimpleWidget } from "~/src/UI-shared/Organisms/Widgets/SimpleWidget";
import { Title } from "~/src/UI-shared/Tokens";
import { RawInput } from "~/src/UI-shared/Atoms/Inputs";
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";

const WidgetsBlock = (): JSX.Element => {
    return <>
        <ST.ProfilControlWidgets $transparent>
        <SimpleWidget width={"40vw"} height={"30vh"} $bordered>
            <Title>Учётные данные</Title>
            <ST.Input $bordered placeholder="Имя…"/>
            <ST.Input $bordered placeholder="Фамилия…"/>
            <ST.Input $bordered placeholder="Дата рождения…"/>
            <StandartButton className="save-button">Сохранить</StandartButton>
        </SimpleWidget>
        <SimpleWidget width={"40vw"} height={"30vh"} $bordered>
            <Title>Пароль</Title>
            <ST.InputWithIcon >
                <RawInput placeholder="Текущий пароль"/>
                <ST.EyeIcon src={Eye}/>
            </ST.InputWithIcon>
            <ST.InputWithIcon >
                <RawInput placeholder="Новый пароль"/>
                <ST.EyeIcon src={Eye}/>
            </ST.InputWithIcon>
            <ST.InputWithIcon >
                <RawInput placeholder="Повторите пароль"/>
                <ST.EyeIcon src={Eye}/>
            </ST.InputWithIcon>
            <StandartButton className="save-button">Сохранить</StandartButton>
        </SimpleWidget>
        </ST.ProfilControlWidgets>
    </>
};

export default WidgetsBlock