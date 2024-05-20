import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import { ButtonRow } from "@ui/Atoms/Containers";
import { StandartInput } from "@ui/Atoms/Inputs";
import DefaultPopup from "~/src/Components/Popup/DefaultPopup";
import { Cancel, Title } from "~/src/Components/Popup/styled";
import { useRef, useState } from "react";
import { StandartButton } from "@ui/Atoms/Buttons";
import { useSelector } from "react-redux";
import { TopicSelector, ComplexitySelector } from "./InputSelectors";

interface IProps {
    onClose: () => void,
}

const AddNewProjectPopup = ({ onClose }: IProps ): JSX.Element => {
    const [isShowTopicSelector, showTopicSelector] = useState(false);
    const [isShowComplexitySelector, setIsShowComplexitySelector] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedComplexity, setSelectedComplexity] = useState('');
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
            return;
        }
        alert('Auth error');
    };

    const selectTheme = (selectedTheme: string) => {
        setSelectedTopic(selectedTheme);
    };

    const selectComplexity = (selectedTopic: string) => {
        setSelectedComplexity(selectedTopic);
    };

    return <>
        <DefaultPopup width={'450px'} height={'auto'}>
            <Cancel size={20} color={'white'} onClick={onClose}/>
            <Title>Добавление проекта</Title>
            <form id='post-form' onSubmit={formSumbit}>
                <StandartInput name={'projectTitle'} ref={projectTitle} placeholder="Название проекта" />
                <StandartInput name={'projectTopic'} ref={projectTopic} value={selectedTopic} placeholder="Тема проекта" onClick={() => showTopicSelector(!isShowTopicSelector)}
                    style={{
                        marginBottom: isShowTopicSelector ? '100px' : ''
                    }}/>
                <TopicSelector updateTopic={selectTheme} isOpen={isShowTopicSelector}/>
                <StandartInput name={'projectDeadlines'} ref={projectDeadlines} placeholder="Сроки проекта"
                    style={{
                        marginTop: isShowTopicSelector ? '100px' : ''
                    }}
                />
                <StandartInput
                    name={'projectComplexity'}
                    ref={projectComplexity}
                    value={selectedComplexity}
                    placeholder="Уровень сложности проекта"
                    onClick={() => {setIsShowComplexitySelector(!isShowComplexitySelector)}}
                />
                <ComplexitySelector updateComplexity={selectComplexity} isOpen={isShowComplexitySelector}/>
                <StandartInput name={'projectDescription'} ref={projectDescription} placeholder="Описани проекта" />
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
 export default AddNewProjectPopup