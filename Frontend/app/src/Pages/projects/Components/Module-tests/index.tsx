import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from '~/src/features/store/menu';
import * as ST from './styled';
import ProgressBar from '@ui/Atoms/ProgressBar';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import { setStage } from '~/src/features/store/projects';
import TestsBlock from './TestsBlock';
import TestFinishResult from './TestFinishResult';

export const ModuleTests = (): JSX.Element => {
    const dispatch = useDispatch();
    const tests = Object.values(useSelector(state => state.modules.tests));
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