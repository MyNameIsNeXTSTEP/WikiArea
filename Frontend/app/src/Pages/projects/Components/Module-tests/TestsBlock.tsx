import * as ST from './styled';
import { ButtonRow } from '@ui/Atoms/Containers';
import { Dispatch, SetStateAction, useCallback } from 'react';

interface IProps {
    setTestsRes: Dispatch<SetStateAction<any>>,
    testsRes: Record<number, number>,
};

const tests = [
    { id: 1, text: 'text 1', answers: [1, 2, 3, 4] },
    { id: 2, text: 'text 2', answers: [1, 2, 3, 4] },
    { id: 3, text: 'text 3', answers: [1, 2, 3, 4] },
    { id: 4, text: 'text 4', answers: [1, 2, 3, 4] },
    { id: 5, text: 'text 5', answers: [1, 2, 3, 4] },
];

const TestsBlock = ({ setTestsRes, testsRes }: IProps): JSX.Element => {
    const selectAnswer = useCallback((id: number, value: number) => {
        setTestsRes({ ...testsRes, [id]: value });
    }, [testsRes]);

    return <>
        {tests.map(test =>
            <ST.TestsWidgets $transparent className='tests-row'>
                <ST.TestSimpleWidget width={"100%"} height={"30vh"} $bordered $purple className='test-widget'>
                    <ST.TestText>{test.text}</ST.TestText>
                    {test.answers.map(answer => <ButtonRow>
                        <ST.RadioSelector type='radio' onChange={() => selectAnswer(test.id, answer)} name={test.text}/>
                        <ST.TestText>{answer}</ST.TestText>
                    </ButtonRow>)}
                </ST.TestSimpleWidget>
            </ST.TestsWidgets>
        )}
    </>
};

export default TestsBlock;