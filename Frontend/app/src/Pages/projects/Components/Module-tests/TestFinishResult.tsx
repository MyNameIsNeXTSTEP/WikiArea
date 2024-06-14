import { ButtonRow } from '@ui/Atoms/Containers';
import * as ST from './styled';
import { SimpleWidget } from "@ui/Organisms/Widgets/SimpleWidget";
import { H1 } from "@ui/Tokens";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBackBtnVisability, updateButtons } from "~/src/features/store/menu";

interface IProps {
    testsRes: Record<number, number>,
}

const TestFinishResult = ({ testsRes }: IProps): JSX.Element => {
    const dispatch = useDispatch();
    const tests = Object.values(useSelector(state => state.modules.tests));

    useEffect(() => {
        dispatch(changeBackBtnVisability(false));
        dispatch(updateButtons([{
            onClick: () => window.location.reload(),
        }]));
    }, []);
    

    return <>
        <SimpleWidget $purple width='400px' height='200px' style={{ margin: 'auto' }}>
            <H1 $white style={{ textDecoration: 'underline' }}>
                Итог выполнения теста
            </H1>
            <p>80/100 баллов</p>
            <p>80%</p>
        </SimpleWidget>
        {tests.map((testCase: any) => {
            console.log(testCase);
            return <ST.TestsWidgets $transparent className='tests-row-finished'>
                <ST.TestSimpleWidget width={"100%"} height={"30vh"} $bordered $purple className='test-widget'>
                    <ST.TestText>{testCase[0].question}</ST.TestText>
                    {testCase.map((question: Record<string, any>) => {
                        const currentAnswer = testsRes[question.question_id];
                        const rightAnswer = question.correct_answer_inner_id;
                        console.log(question.correct_answer_inner_id);
                        return <ButtonRow>
                            <ST.RadioSelector
                                type='radio'
                                name={question.question}
                                checked
                                readOnly
                                $finished
                                right={currentAnswer === rightAnswer}
                            />
                            <ST.TestText>{question.answer}</ST.TestText>
                        </ButtonRow>
                    })}
                </ST.TestSimpleWidget>
            </ST.TestsWidgets>
            }
        )}
    </>
};

export default TestFinishResult;