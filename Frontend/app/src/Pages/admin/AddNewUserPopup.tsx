import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import { ButtonRow } from "@ui/Atoms/Containers";
import { StandartInput } from "@ui/Atoms/Inputs";
import DefaultPopup from "~/src/Components/Popup/DefaultPopup";
import { Cancel, Title } from "~/src/Components/Popup/styled";
import { useRef, useState } from "react";
import { StandartButton } from "@ui/Atoms/Buttons";
import { useSelector } from "react-redux";

interface IProps {
    onClose: () => void,
}

const AddNewUserPopup = ({ onClose }: IProps ): JSX.Element => {
    const [isShowRoleSelector, showRoleSelector] = useState(false);
    const login = useSelector(state => state.profile.auth.login) // teacher
    const projectTitle = useRef<HTMLInputElement>(null);
    const projectTopic = useRef<HTMLInputElement>(null);
    const projectDeadlines = useRef<HTMLInputElement>(null);
    const projectComplexity = useRef<HTMLInputElement>(null);
    const projectDescription = useRef<HTMLInputElement>(null);

    const formSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        let collectedFormFields = {};
        formData.forEach((value, property: string) => {
            console.log(property, value);
            //@ts-ignore
            collectedFormFields[property] = value;
        });
        collectedFormFields['author'] = login,
        submitForm(collectedFormFields);
    };

    const request = (formRequest) => {
        return {
            uri: '/api/projects/add-new-project',
            method: TRequestMethod.POST,
            body: JSON.stringify(formRequest)
        }
    };

    const submitForm = async (collectedFormFields: any) => {
        const res = await new APIRequest(request(collectedFormFields)).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            return;
        }
        alert('Auth error');
    };

    return <>
        <DefaultPopup width={'450px'} height={'auto'}>
            <Cancel size={20} color={'white'} onClick={onClose}/>
            <Title>Добавление проекта</Title>
            <form id='post-form' onSubmit={formSumbit}>
                <StandartInput name={'projectTitle'} ref={projectTitle} placeholder="Придумайте логин" />
                <StandartInput name={'projectTopic'} ref={projectTopic} value={selectedTopic} placeholder="Введите пароль" onClick={}/>
                <StandartInput name={'projectDeadlines'} ref={projectDeadlines} placeholder="Повторите пароль"/>
                <StandartInput
                    name={'projectComplexity'}
                    ref={projectComplexity}
                    value={selectedComplexity}
                    placeholder="Выберите роль"
                    onClick={() => {setIsShowComplexitySelector(!isShowComplexitySelector)}}
                />
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
