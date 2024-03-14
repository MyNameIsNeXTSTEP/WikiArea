import { useRef, useState } from 'react';
import * as ST from '../../Popup/styled';
import APIRequest from '@api-package/index';

import { TRequestMethod } from '@api-package/types';
import { StandartInput } from "~/src/UI-shared/Atoms/Inputs";
import DefaultPopup from "../../Popup/DefaultPopup";
import { Button, ButtonRow } from '../../BreakLine/styled';

interface IProps {
    isOpen: boolean,
    close: () => void,
};

type TFormRequest = Record<string, any>

const RegisterPopup = ({ isOpen, close }: IProps): JSX.Element | null => {
    const [isDoublePassValid, updateIsDoublePassValid] = useState(false);
    const email = useRef<HTMLInputElement>(null); // @todo: validate
    const login = useRef<HTMLInputElement>(null); // @todo: validate
    const password = useRef<HTMLInputElement>(null);
    const passwordDoubleCheck = useRef<HTMLInputElement>(null);
    const role = useRef<HTMLInputElement>(null); // @todo: validate
    const request = (formRequest: TFormRequest) => {
        return {
            uri: '/api/user/register',
            method: TRequestMethod.POST,
            body: JSON.stringify(formRequest)
        }
    };
    const submitRegistration = async (collectedFormFields: TFormRequest) => {
        const res = await new APIRequest(request(collectedFormFields)).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            const { accessToken } = res.payload.body;
            document.cookie = `access_token=${accessToken}; path=/; max-age=${60 * 60 * 5}` // for 2 hours
            return;
        }
        alert('Auth error');
    };
    const doubleCheckPassword = () => {
        const passCheck = passwordDoubleCheck.current?.value
        const currentPassword = password.current?.value
        if (passCheck && currentPassword !== passCheck && passCheck.length > 0) {
            updateIsDoublePassValid(true);
        } else {
            updateIsDoublePassValid(false);
        }
        
    };
    const formSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        let collectedFormFields = {} as TFormRequest;
        formData.forEach((value, property: string) => {
            console.log(property, value);
            collectedFormFields[property] = value;
        });
        submitRegistration(collectedFormFields);
    };
    return isOpen
        ? <DefaultPopup>
            <form id='post-form' onSubmit={formSumbit}>
                <ST.Cancel size={20} color={'white'} onClick={close}/>
                <ST.Title>Регистрация</ST.Title>
                <StandartInput name={'email'} ref={email} placeholder="Введите email..." />
                <StandartInput name={'login'} ref={login} placeholder="Придумайте логин..."/>
                <StandartInput name={'password'} ref={password} placeholder="Придумайте пароль..."/>
                <StandartInput ref={passwordDoubleCheck} placeholder="Повторите пароль..." onChange={doubleCheckPassword}/>
                {isDoublePassValid && <strong style={{ color: 'red' }}>Пароли не совпадают</strong>}
                <StandartInput name={'role'} ref={role} placeholder="Выберите вашу роль..."/>
                <ButtonRow>
                    <Button
                        onClick={() => {}}
                        style={{ marginLeft: 0, marginBottom: 10 }}
                    >
                        Зарегистрироваться
                    </Button>
                </ButtonRow>
            </form>
        </DefaultPopup>
        : null;
};

export default RegisterPopup;