import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import { ButtonRow } from "@ui/Atoms/Containers";
import { StandartInput } from "@ui/Atoms/Inputs";
import DefaultPopup from "~/src/Components/Popup/DefaultPopup";
import { Cancel, Title } from "~/src/Components/Popup/styled";
import { useRef, useState } from "react";
import { StandartButton } from "@ui/Atoms/Buttons";
import { useSelector } from "react-redux";
import { useFormSubmitHandler } from "~/src/a-lib";
import RolesSelector from "~/src/Components/Authorization/RegisterPopup/RolesSelector";

interface IProps {
    onClose: () => void,
}

const AddNewUserPopup = ({ onClose }: IProps ): JSX.Element => {
    const [isShowRoleSelector, showRoleSelector] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const submitHandler = useFormSubmitHandler();
    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const data = submitHandler(e);
        const res = await new APIRequest({
            uri: '/api/users/add-new-user',
            method: TRequestMethod.POST,
            body: JSON.stringify(data),
        }).doRequest();
        if (!res.isSuccess) alert('Error, please contact your technical administrator');
    };

    return <>
        <DefaultPopup width={'450px'} height={'auto'}>
            <Cancel size={20} color={'white'} onClick={onClose}/>
            <Title>Добавление пользователя</Title>
            <form id='post-form' onSubmit={formSubmit}>
                <StandartInput name={'login'} placeholder="Придумайте логин" />
                <StandartInput name={'email'} placeholder="Введите почту"/>
                <StandartInput name={'password'} placeholder="Введите пароль" onClick={() => alert(1)}/>
                <StandartInput name={'repeatedPassword'} placeholder="Повторите пароль"/>
                <StandartInput
                    name={'role'}
                    value={selectedRole}
                    placeholder="Выберите роль"
                    onClick={() => showRoleSelector(!isShowRoleSelector)}
                />
                <RolesSelector updateRole={selectedRole => setSelectedRole(selectedRole)} isOpen={isShowRoleSelector}/>
                <ButtonRow>
                    <StandartButton
                        $whiteBordered
                        onClick={() => {}}
                        style={{ marginLeft: 0, marginBottom: 10 }}
                    >
                        Добавить
                    </StandartButton>
                    <StandartButton $whiteBordered onClick={onClose}>Отмена</StandartButton>
                </ButtonRow>
            </form>
        </DefaultPopup>
    </>
}

export default AddNewUserPopup;
