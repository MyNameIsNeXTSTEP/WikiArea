import { StandartButton } from "@ui/Atoms/Buttons";
import { ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { StandartInput } from "@ui/Atoms/Inputs";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { RadioSelector } from "../Module-tests/styled";
import { debounce, useFormSubmitHandler } from "~/src/a-lib";
import { useState } from "react";

const AddTests = (): JSX.Element => {
    const [variants, setVariants] = useState(['ответ 1', 'ответ 2', 'ответ 3', 'ответ 4']);
    const onChangeVariant = (answer: string, id: number) => {
        setVariants(prevState => {
            prevState[id] = answer;
            return prevState;
        });
    };
    const onAddNewVariant = () => {
        setVariants([...variants, '']);
    };

    const formSumbit = (e) => {
        const formData = useFormSubmitHandler(e);
        console.log(formData);
    }

    return <WidgetWith2Items $rounded height='500px'>
        <form id='post-add-test-form' onSubmit={formSumbit}
        style={{
            display: 'flex',
            width: '100%',
            height: '100%'
        }}>
            <Left height='100%' width='400px' className="left" style={{ display: 'flex', marginTop: '20px' }}>
                <StandartInput
                    name={'test-question'}
                    placeholder="Введите вопрос"
                    width="100%"
                />
            </Left>
            <Right width='300px' style={{
                marginTop: '20px',
                top: 0,
                right: 0,
                position: 'absolute',
            }}>
                <StandartButton $width="100%" $whiteBordered onClick={onAddNewVariant}>
                    Добавить вариант
                </StandartButton>
            </Right>
            <div style={{
                position: 'absolute',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                height: '400px',
                width: '100%',
                marginTop: '50px'
            }}>
                {variants.map((v, id) => {
                    return <ButtonRow key={v} style={{ marginTop: '40px', width: '60%', marginLeft: '20px' }}>
                        <RadioSelector type='radio' style={{ marginBottom: '13px'}} onChange={() => console.log(v)} name={v}/>
                            <StandartInput defaultValue={variants[id]} onChange={debounce((e) => onChangeVariant(e.target?.value, id), 300)} width="50%"/>
                            <StandartButton $whiteBordered $width="200px">
                                Удалить вариант
                            </StandartButton>
                    </ButtonRow>
                })}
            </div>
        </form>
    </WidgetWith2Items>
}

export default AddTests;