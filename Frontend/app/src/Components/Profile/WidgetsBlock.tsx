import { FormEvent, useEffect, useState } from "react";
import Eye from "~/src/assets/svg/Eye.svg";
import { SimpleWidget } from "~/src/UI-shared/Organisms/Widgets/SimpleWidget";
import { Title } from "~/src/UI-shared/Tokens";
import { RawInput } from "~/src/UI-shared/Atoms/Inputs";
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { TFormRequest, useFormSubmitHandler } from "~/src/a-lib";
import * as ST from "./styled";
import { TRequestMethod } from "@api-package/types";
import APIRequest from "@api-package/index";
import { useSelector } from "react-redux";

interface IPersonalData {
    first_name: string,
    second_name: string,
    birth_date: string,
};

const WidgetsBlock = (): JSX.Element => {
    // @ts-ignore
    const { role, login } = useSelector(state => state.profile.auth);
    const [currentPersonalData, updateCurrentPersonalData] = useState<IPersonalData>({
        first_name: '',
        second_name: '',
        birth_date: '',
    });
    const submitHandler = useFormSubmitHandler();
    const submitChangePersonalData = async (collectedFormFields: TFormRequest) => {
        const request = {
            uri: '/api/user/change-personal-data',
            method: TRequestMethod.POST,
            body: JSON.stringify({ ...collectedFormFields, role })
        };
        const res = await new APIRequest(request).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            console.log(res);
            return 1;
        }
    };
    const onChangePersonalData = (e: FormEvent<HTMLFormElement>) => {
        const data = submitHandler(e);
        submitChangePersonalData(data);
    };

    // @todo: Should we use it after for displaying ?
    useEffect(() => {
        (async () => {
            const request = {
                uri: '/api/user/get-personal-data',
                method: TRequestMethod.GET,
                queryParams: { role, login }
            };
            const res = await new APIRequest(request).doRequest();
            if (res.isSuccess &&
                res.statusCode === 200 &&
                res.payload.data.length > 0
            ) {
                updateCurrentPersonalData(res.payload.data[0]);
            }
        })()
    }, []);

    return <>
        <ST.ProfilControlWidgets $transparent>
        <SimpleWidget width={"40vw"} height={"30vh"} $bordered>
            <form id='post-form' onSubmit={onChangePersonalData}>
                <Title>Учётные данные</Title>
                <ST.Input $bordered name="first_name" placeholder="Имя…"/>
                <ST.Input $bordered name='second_name' placeholder="Фамилия…"/>
                <ST.Input $bordered name='birth_date' placeholder="Дата рождения…"/>
                <StandartButton className="save-button">Сохранить</StandartButton>
            </form>
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