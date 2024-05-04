import { ButtonRow } from '@ui/Atoms/Containers';
import * as ST from './styled';
import { SimpleWidget } from "@ui/Organisms/Widgets/SimpleWidget";
import { H1 } from "@ui/Tokens";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeBackBtnVisability, updateButtons } from "~/src/features/store/menu";

interface IProps {
    testsRes: Record<number, number>,
}

const tests = [
    { id: 1, text: 'text 1', answers: [1, 2, 3, 4], rightAnswer: 1 },
    { id: 2, text: 'text 2', answers: [1, 2, 3, 4], rightAnswer: 2 },
    { id: 3, text: 'text 3', answers: [1, 2, 3, 4], rightAnswer: 2},
    { id: 4, text: 'text 4', answers: [1, 2, 3, 4], rightAnswer: 3 },
    { id: 5, text: 'text 5', answers: [1, 2, 3, 4], rightAnswer: 0 },
];

const TestFinishResult = ({ testsRes }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(changeBackBtnVisability(false));
        dispatch(updateButtons([{
            onClick: () => alert(true),
        }]));
    }, []);
    return <>
        <SimpleWidget $purple width='400px' height='200px' style={{ margin: 'auto' }}>
            <H1 $white style={{ textDecoration: 'underline' }}>
                Итог выполнения теста
            </H1>
            <p>0/100 баллов</p>
            <p>y%</p>
        </SimpleWidget>
        {tests.map(test =>
            <ST.TestsWidgets $transparent className='tests-row-finished'>
                <ST.TestSimpleWidget width={"100%"} height={"30vh"} $bordered $purple className='test-widget'>
                    <ST.TestText>{test.text}</ST.TestText>
                    {test.answers.map((answer, answerId) => {
                        console.log(testsRes[test.id] === test.rightAnswer);
                        return <ButtonRow>
                            <ST.RadioSelector type='radio' name={test.text} checked readOnly $finished right={testsRes[test.id] === test.rightAnswer}/>
                            <ST.TestText>{answer}</ST.TestText>
                        </ButtonRow>
                    })}
                </ST.TestSimpleWidget>
            </ST.TestsWidgets>
        )}
    </>
};

export default TestFinishResult;