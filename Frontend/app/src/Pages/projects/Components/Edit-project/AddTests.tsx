import { StandartButton } from "@ui/Atoms/Buttons";
import { ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { StandartInput } from "@ui/Atoms/Inputs";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { RadioSelector } from "../Module-tests/styled";
import { debounce } from "~/src/a-lib";
import { useState } from "react";
import { useDispatch } from "react-redux";

const AddTests = (): JSX.Element => {
    const dispatch = useDispatch();
    const [variants, setVariants] = useState(['ответ 1', 'ответ 2', 'ответ 3', 'ответ 4']);
    const [mainBlockHeight, setMainBlockHeight] = useState(450);
    const onChangeVariant = (answer: string, id: number) => {
        setVariants(prevState => {
            prevState[id] = answer;
            return prevState;
        });
    };
    const onAddNewVariant = () => {
        setMainBlockHeight(prevState => prevState + 80);
        setVariants([...variants, '']);
    };

    return <WidgetWith2Items $rounded height={`${String(mainBlockHeight)}px`}>
            <Left height='100%' width='400px' className="left" style={{ display: 'flex', marginTop: '50px' }}>
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
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                height: '400px',
                width: '100%',
                marginTop: '50px',
                marginBottom: '20px',
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
    </WidgetWith2Items>
}

export default AddTests;