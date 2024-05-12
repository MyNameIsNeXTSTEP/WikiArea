import * as ST from './Components/Project-deatails/styled';
import WidgetWith2Items from '@ui/Organisms/Widgets/WidgetWith2Items';
import { ProjectSlug as ProjectLogo } from '@ui/assets/svg';
import { IProject } from '~/src/a-lib';
import { ImageBlock, ProjectImage } from '@ui/Atoms/icons';
import { Left, Right } from '@ui/Atoms/Containers';
import { StandartLabel } from '@ui/Atoms/Labels';
import { complexityMapNumbers } from '~/src/a-lib';
import { StandartButton } from '@ui/Atoms/Buttons';
import { setIsOpenSubscribedProjects, setProjectDetailsPage, setStage } from '~/src/features/store/projects';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { StandartPopupWithContent } from '~/src/Components/Popup/StandartPopupWithContent';
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from '~/src/features/store/menu';
import APIRequest from '@api-package/index';
import { TRequestMethod } from '@api-package/types';

interface IProps {
    project?: IProject,
}

const SubscribedProjects = ({ project }: IProps): JSX.Element | null => {
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.profile.auth);
    const [isOpenUnsubsribePopup, openUnsubscribePopup] = useState(false);
    if (!project) return null;
    const onOpenDetailedPage = useCallback(() => {
        dispatch(setStage(2));
        dispatch(setProjectDetailsPage({ isOpen: true, project }))
        dispatch(setIsOpenSubscribedProjects(false));
        dispatch(updateButtons([{
            id: 1,
            onClick: () => {
                dispatch(setStage(1));
                dispatch(setIsOpenSubscribedProjects(true));
                dispatch(setProjectDetailsPage({ isOpen: false }));
            },
        }]));
    }, []);
    const unsubscribeFromTheProject = async () => {
        const res = await new APIRequest({
            uri: '/api/users/unsubscribe-from-project',
            method: TRequestMethod.POST,
            body: JSON.stringify({ email, projectId: project.id }),
        }).doRequest();
        if (!res.isSuccess || res.statusCode !== 200) {
            alert('Ошибка удаления подписки, пожалуйста, обратитесь к администратору');
        }
    };
    return <>
        <WidgetWith2Items $rounded height='200px'>
            <Left style={{ flexDirection: 'column', display: 'flex', height: '100%' }} className="left">
                <ImageBlock $abs style={{ marginTop: '10px', position: 'absolute', top: 0 }} className="profile-block">
                    <ProjectImage src={ProjectLogo} />
                </ImageBlock>
                <ST.ProjectsData>
                    {Object.keys(project).map((key: string) => {
                        if (key === 'complexity') {
                            const complexityNumber = project[key];
                            return <StandartLabel $white>
                                {complexityMapNumbers[complexityNumber]}
                            </StandartLabel>;
                        }
                        return <StandartLabel $white>{project[key]}</StandartLabel>;
                    })}
                </ST.ProjectsData>
                <StandartLabel style={{ alignSelf: 'flex-start' }} $white>Подписано:</StandartLabel>
            </Left>
            <Right className="right" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <StandartButton
                    $whiteBordered
                    $width={'180px'}
                    className="subscribtion"
                    onClick={onOpenDetailedPage}
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
                firstBtn='Отписаться'
                firstBtnOnClick={unsubscribeFromTheProject}
            />
        }
    </>;
};

export default SubscribedProjects;