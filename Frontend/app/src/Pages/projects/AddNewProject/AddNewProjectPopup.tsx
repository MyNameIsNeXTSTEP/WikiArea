import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import { ButtonRow } from "~/src/UI-shared/Atoms/Containers";
import { StandartInput } from "~/src/UI-shared/Atoms/Inputs";
import DefaultPopup from "~/src/Components/Popup/DefaultPopup";
import { Cancel, Title } from "~/src/Components/Popup/styled";
import { useRef, useState } from "react";
import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { useSelector } from "react-redux";
import { ThemeSelector, ComplexitySelector } from "./InputSelectors";

interface IProps {
    onClose: () => void,
}

const AddNewProjectPopup = ({ onClose }: IProps ): JSX.Element => {
    const [isShowThemesSelector, showThemeSelector] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('');
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
        //@ts-ignore
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
            const { accessToken } = res.payload.body;
            document.cookie = `access_token=${accessToken}; path=/; max-age=${60 * 60 * 5}` // for 2 hours
            return;
        }
        alert('Auth error');
    };

    const selectTheme = (selectedTheme: string) => {
        setSelectedTheme(selectedTheme);
    };

    return <>
        <DefaultPopup width={'450px'} height={'auto'}>
            <form id='post-form' onSubmit={formSumbit}>
                <Cancel size={20} color={'white'} onClick={onClose}/>
                <Title>Добавление проекта</Title>
                <StandartInput name={'projectTitle'} ref={projectTitle} placeholder="Название проекта" />
                <StandartInput name={'projectTopic'} ref={projectTopic} value={selectedTheme} placeholder="Тема проекта" onClick={() => showThemeSelector(!isShowThemesSelector)}
                    style={{
                        marginBottom: isShowThemesSelector ? '100px' : ''
                    }}/>
                <ThemeSelector updateTheme={selectTheme} isOpen={isShowThemesSelector}/>
                <StandartInput name={'projectDeadlines'} ref={projectDeadlines} placeholder="Сроки проекта"
                    style={{
                        marginTop: isShowThemesSelector ? '100px' : ''
                    }}
                />
                <StandartInput name={'projectComplexity'} ref={projectComplexity} placeholder="Уровень сложности проекта" />
                <StandartInput name={'projectDescription'} ref={projectDescription} placeholder="Описани проекта" />
                <ButtonRow>
                    <StandartButton
                        $whiteBordered
                        onClick={() => {}}
                        style={{ marginLeft: 0, marginBottom: 10 }}
                    >
                        Добавить
                    </StandartButton>
                    <StandartButton $whiteBordered>Отмена</StandartButton>
                </ButtonRow>
            </form>
        </DefaultPopup>
    </>
}
 export default AddNewProjectPopup