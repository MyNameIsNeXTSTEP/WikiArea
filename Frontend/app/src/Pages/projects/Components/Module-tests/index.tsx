import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from '~/src/features/store/menu';
import * as ST from './styled';
import ProgressBar from '@ui/Atoms/ProgressBar';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import { setStage } from '~/src/features/store/projects';
import TestsBlock from './TestsBlock';
import TestFinishResult from './TestFinishResult';

const tests = [
    { id: 1, text: 'text 1', answers: [1, 2, 3, 4] },
    { id: 2, text: 'text 2', answers: [1, 2, 3, 4] },
    { id: 3, text: 'text 3', answers: [1, 2, 3, 4] },
    { id: 4, text: 'text 4', answers: [1, 2, 3, 4] },
    { id: 5, text: 'text 5', answers: [1, 2, 3, 4] },
];

export const ModuleTests = (): JSX.Element => {
    const dispatch = useDispatch();
    const [testsRes, setTestsRes] = useState({} as Record<number, number>);
    const [isTestFinished, setIsTestFinished] = useState(false);
    const [isOpenFinishPopup, openFinishPopup] = useState(false);
    const [progress, updateProgress] = useState(0);
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
        if (!isTestFinished) {
            dispatch(setStage(3));
            dispatch(updateMainMenuFlag(false));
            dispatch(changeBackBtnVisability(true));
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
        }
    }, [isTestFinished]);

    return <>
        {isTestFinished
            ? <TestFinishResult testsRes={testsRes}/>
            : <>
                <ProgressBar width={progress}/>
                <ST.Container className='tests-container'>
                    <TestsBlock setTestsRes={setTestsRes} testsRes={testsRes}/>
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
        }
    </>
};

export default ModuleTests;