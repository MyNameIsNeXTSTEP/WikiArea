import { useImperativeHandle, useRef, useState } from 'react';
import * as ST from '../../Popup/styled';
import APIRequest from '@api-package/index';

import { TRequestMethod } from '@api-package/types';
import { StandartInput } from "@ui/Atoms/Inputs";
import DefaultPopup from "../../Popup/DefaultPopup";
import { Button, ButtonRow } from '../../BreakLine/styled';
import RolesSelector from './RolesSelector';

interface IProps {
    isOpen: boolean,
    close: () => void,
};

type TFormRequest = Record<string, any>

const RegisterPopup = ({ isOpen, close }: IProps): JSX.Element | null => {
    const [isDoublePassValid, updateIsDoublePassValid] = useState(false);
    const [isPasswordOk, updateIsPasswordOk] = useState(true);
    const [isShowRoleSelector, showRoleSelector] = useState(false);
    const [selectedRole, updateSelectedRole] = useState('');
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
    const validatePassword = () => {
        const pswdCheck = password.current?.value;
        const ok = pswdCheck && pswdCheck?.length > 0 &&
            pswdCheck
            ?.match(/^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^0-9]*[0-9])(?=[^!~<>,;:_=?*+#."&§%°()|\[\]$^@\/-]*[!~<>,;:_=?*+#."&§%°()|\[\]$^@\/-])(?![a-zA-Z0-9!~<>,;:_=?*+#."&§%°()|\[\]$^@\/-]*([a-zA-Z0-9!~<>,;:_=?*+#."&§%°()|\[\]$^@\/-])\1\1)[a-zA-Z0-9!~<>,;:_=?*+#."&§%°()|\[\]$^@\/-]{8,}$/);
        if (ok && ok.length > 0) {
            updateIsPasswordOk(true);
        } else {
            updateIsPasswordOk(false);
        };
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
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        let collectedFormFields = {} as TFormRequest;
        formData.forEach((value, property: string) => {
            collectedFormFields[property] = value;
        });
        submitRegistration(collectedFormFields);
    };
    const openRoleSelector = () => {
        showRoleSelector(!isShowRoleSelector);
    };
    const selectRole = (selectedRole: string) => {
        updateSelectedRole(selectedRole + 's');
    };
    return isOpen
        ? <DefaultPopup>
            <ST.Cancel size={20} color={'white'} onClick={close}/>
            <form id='post-form' onSubmit={formSubmit}>
                <ST.Title>Регистрация</ST.Title>
                <StandartInput name={'email'} ref={email} placeholder="Введите email..." />
                <StandartInput name={'login'} ref={login} placeholder="Придумайте логин..."/>
                <StandartInput name={'password'} ref={password} placeholder="Придумайте пароль..." onChange={validatePassword}/>
                {!isPasswordOk && <strong style={{ color: 'red' }}>Пароль должен содержать символы 0-9, A-z, a-z, спец. символы</strong>}
                <StandartInput ref={passwordDoubleCheck} placeholder="Повторите пароль..." onChange={doubleCheckPassword}/>
                {isDoublePassValid && <strong style={{ color: 'red' }}>Пароли не совпадают</strong>}
                <StandartInput name={'role'} ref={role} value={selectedRole} placeholder="Выберите вашу роль..." onClick={openRoleSelector}/>
                <RolesSelector updateRole={selectRole} isOpen={isShowRoleSelector}/>
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