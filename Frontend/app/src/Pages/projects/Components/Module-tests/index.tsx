import { useEffect, useCallback, useState } from 'react';
import { SimpleWidget } from '@ui/Organisms/Widgets/SimpleWidget';
import { useDispatch } from 'react-redux';
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from '~/src/features/store/menu';
import * as ST from './styled';
import { ButtonRow } from '@ui/Atoms/Containers';
import { H1 } from '@ui/Tokens';
import ProgressBar from '@ui/Atoms/ProgressBar';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';

export const ModuleTests = (): JSX.Element => {
    const dispatch = useDispatch();
    const [testsRes, setTestsRes] = useState({} as Record<number, number>);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [isOpenFinishPopup, openFinishPopup] = useState(false);
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
        const answered = Object.keys(testsRes).length;
        if (progressFullWidth) {
            const portion = progressFullWidth / tests.length;
            updateProgress(answered * portion);
        };
    }, [testsRes]);

     useEffect(() => {
        calcProgressBar();
     }, [testsRes])

     const handleFinish = () => {
         if (Object.keys(testsRes).length === tests.length) {
            setIsTestFinished(true);
        };
     };
     
     useEffect(() => {
        dispatch(updateButtons(
            [{
                onClick: () => openFinishPopup(true),
                label: 'Закончить',
                props: {
                    $whiteBordered: true,
                    width: '150px',
                    style: { marginTop: '15px', marginBottom: '15px'}
                }
            }]
        ));
        dispatch(changeBackBtnVisability(true));
        dispatch(updateMainMenuFlag(false));
    }, []);
    
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
        { !isTestFinished && <ProgressBar width={progress}/> }
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
        <StandartPopupWithContent
            isOpen={isOpenFinishPopup}
            updateIsOpen={openFinishPopup}
            text='Вы действительно хотите закончить выполлнение теста ?'
            firstBtn='Закончить'
            firstBtnOnClick={handleFinish}
            height='260px'
        />
    </>

};

export default ModuleTests;