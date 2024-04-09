import * as ST from './styled';
import WidgetWith2Items from '~/src/UI-shared/Organisms/Widgets/WidgetWith2Items';
import ProjectLogo from '~/src/assets/svg/ProjectSlug.svg';
import { IProject } from '~/src/a-lib';
import { ImageBlock, ProjectImage } from '~/src/UI-shared/Atoms/icons';
import { Left, Right } from '~/src/UI-shared/Atoms/Containers';
import { StandartLabel } from '~/src/UI-shared/Atoms/Labels';
import { complexityMapNumbers } from '~/src/a-lib';
import { StandartButton } from '~/src/UI-shared/Atoms/Buttons';
import { setProjectDetailsPage } from '~/src/features/store/projects';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';

const SubscribedProjects = (project?: IProject): JSX.Element | null => {
    const dispatch = useDispatch();
    const [isOpenUnsubsribePopup, openUnsubscribePopup] = useState(false);
    if (!project) {
        return null;
    }
    return <>
        <WidgetWith2Items $rounded height='100px'>
            <Left style={{ flexDirection: 'column', display: 'flex' }} className="left">
                <ImageBlock $abs style={{ marginTop: '10px' }} className="profile-block">
                    <ProjectImage src={ProjectLogo} />
                </ImageBlock>
                <ST.ProjectsData>
                    {Object.keys(project.project).map((key: string) => {
                        if (key === 'complexity') {
                            const complexityNumber = project.project[key];
                            return <StandartLabel $white>
                                {complexityMapNumbers[complexityNumber]}
                            </StandartLabel>;
                        }
                        return <StandartLabel $white>{project.project[key]}</StandartLabel>;
                    })}
                </ST.ProjectsData>
                <StandartLabel style={{ alignSelf: 'flex-start' }} $white>Подписано:</StandartLabel>
            </Left>
            <Right className="right" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <StandartButton
                    $whiteBordered
                    $width={'180px'}
                    className="subscribtion"
                    onClick={() => dispatch(setProjectDetailsPage({ isOpen: true, project: project }))}
                >
                    Просмотр
                </StandartButton>
                <StandartButton $whiteBordered $width={'180px'} className="subscribtion" onClick={openUnsubscribePopup}>Отписаться</StandartButton>
            </Right>
        </WidgetWith2Items>
        {isOpenUnsubsribePopup &&
            <StandartPopupWithContent
                isOpen={isOpenUnsubsribePopup}
                updateIsOpen={openUnsubscribePopup}
                text='Вы действительно хотите отписатья от проекта ?'
                firstBtn='Отписаться' />}
    </>;
};

export default SubscribedProjects;