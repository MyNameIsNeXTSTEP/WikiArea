import { SimpleWidget } from '~/src/UI-shared/Organisms/Widgets/SimpleWidget';
import * as ST from './styled';
import { ButtonRow } from '~/src/UI-shared/Atoms/Containers';
import WidgetWith2Items from '~/src/UI-shared/Organisms/Widgets/WidgetWith2Items';

const ModuleTests = (): JSX.Element => {
    const tests = [
        { id: 1, text: 'text 1', answers: [ 1, 2, 3, 4]},
        { id:2, text: 'text 2', answers: [ 1, 2, 3, 4]},
        { id: 3, text: 'text 3', answers: [ 1, 2, 3, 4]},
        { id: 4, text: 'text 4', answers: [ 1, 2, 3, 4]},
        { id: 5, text: 'text 5', answers: [ 1, 2, 3, 4]},
    ];
    const progressBar = (): JSX.Element => {
        return <>
        </>
    };

    return <ST.Container className='tests-container'>
        {tests.map(test => <ST.TestsWidgets $transparent className='tests-row'>
             <ST.TestSimpleWidget width={"100%"} height={"30vh"} $bordered $purple className='test-widget'>
                <ST.TestText>{test.text}</ST.TestText>
                {test.answers.map(answer => <ButtonRow>
                    <ST.RadioSelector type={'radio'} />
                    <ST.TestText>{answer}</ST.TestText>
                </ButtonRow>)}
            </ST.TestSimpleWidget>
        </ST.TestsWidgets>)}
    </ST.Container>

};

export default ModuleTests;