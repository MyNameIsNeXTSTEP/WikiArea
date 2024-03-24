import { useEffect, useCallback, useState } from 'react';
import { SimpleWidget } from '~/src/UI-shared/Organisms/Widgets/SimpleWidget';
import * as ST from './styled';
import { ButtonRow } from '~/src/UI-shared/Atoms/Containers';
import { H1 } from '~/src/UI-shared/Tokens';
import ProgressBar from '~/src/UI-shared/Atoms/ProgressBar';

export const ModuleTests = (): JSX.Element => {
    const [testsRes, setTestsRes] = useState({} as Record<number, number>);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [progress, updateProgress] = useState(0);
    const tests = [
        { id: 1, text: 'text 1', answers: [1, 2, 3, 4] },
        { id: 2, text: 'text 2', answers: [1, 2, 3, 4] },
        { id: 3, text: 'text 3', answers: [1, 2, 3, 4] },
        { id: 4, text: 'text 4', answers: [1, 2, 3, 4] },
        { id: 5, text: 'text 5', answers: [1, 2, 3, 4] },
    ];
    const calcProgressBar = useCallback(() => {
        const progressFullWidth = document.getElementById('progress-bar-wrapper')?.offsetWidth;
        console.log(progressFullWidth, 'width');
        const answered = Object.keys(testsRes).length;
        if (progressFullWidth) {
            const portion = progressFullWidth / tests.length;
            updateProgress(answered * portion);
        };
        console.log(progress, 'progress');
    }, [testsRes]);

     useEffect(() => {
        calcProgressBar();
     }, [testsRes])

     /**
      * On testsRes len === tests len && finish btn clicked => test sum of points
     */
    
    const selectAnswer = useCallback((id: number, value: number) => {
        setTestsRes({ ...testsRes, [id]: value });
    }, [testsRes]);
    
    const TestFinishResult = (): JSX.Element | null => {
        if (!isTestFinished) return null;
        return <SimpleWidget $purple width='400px' height='200px' style={{ margin: 'auto' }}>
            <H1 $white style={{ textDecoration: 'underline' }}>Итог выполнения теста</H1>
            <p>0/100 баллов</p>
            <p>y%</p>
        </SimpleWidget>;
    };

    return <>
        <ProgressBar width={progress}/>
        <TestFinishResult/>
        <ST.Container className='tests-container'>
            {tests.map(test => <ST.TestsWidgets $transparent className='tests-row'>
                <ST.TestSimpleWidget width={"100%"} height={"30vh"} $bordered $purple className='test-widget'>
                    <ST.TestText>{test.text}</ST.TestText>
                    {test.answers.map(answer => <ButtonRow>
                        <ST.RadioSelector type='radio' onChange={() => selectAnswer(test.id, answer)} name={test.text}/>
                        <ST.TestText>{answer}</ST.TestText>
                    </ButtonRow>)}
                </ST.TestSimpleWidget>
            </ST.TestsWidgets>)}
        </ST.Container>
    </>

};

export default ModuleTests;