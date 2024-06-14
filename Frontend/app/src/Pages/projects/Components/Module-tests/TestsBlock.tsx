import * as ST from './styled';
import { ButtonRow } from '@ui/Atoms/Containers';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useSelector } from 'react-redux';

interface IProps {
    setTestsRes: Dispatch<SetStateAction<any>>,
    testsRes: Record<number, number>,
};

const TestsBlock = ({ setTestsRes, testsRes }: IProps): JSX.Element => {
    const tests = useSelector(state => state.modules.tests);
    const selectAnswer = useCallback((id: number, value: number) => {
        setTestsRes({ ...testsRes, [id]: value });
    }, [testsRes]);

    return <>
        {Object.values(tests).map((test: any) =>
            <ST.TestsWidgets $transparent className='tests-row'>
                <ST.TestSimpleWidget width={"100%"} height={"30vh"} $bordered $purple className='test-widget'>
                    <ST.TestText>{test[0].question}</ST.TestText>
                    {test.map((obj: Record<string, any>) => <ButtonRow>
                        <ST.RadioSelector type='radio' onChange={() => selectAnswer(obj.question_id, obj.answer_id)} name={test.text}/>
                        <ST.TestText>{obj.answer}</ST.TestText>
                    </ButtonRow>)}
                </ST.TestSimpleWidget>
            </ST.TestsWidgets>
        )}
    </>
};

export default TestsBlock;