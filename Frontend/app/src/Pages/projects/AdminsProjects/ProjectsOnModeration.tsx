import * as STC from '../Components/Project-deatails/styled';
import * as ST from './styled';
import { useEffect, useState } from "react";
import { IProject } from "~/src/a-lib";
import { TRequestMethod } from "@api-package/types";
import APIRequest from "@api-package/index";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { ApproveCheckMark, CrossCheckMark, ProjectSlug as ProjectLogo } from '@ui/assets/svg';
import { ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { ImageBlock, ProjectImage } from "@ui/Atoms/icons";
import { StandartLabel } from "@ui/Atoms/Labels";
import { complexityMapNumbers } from "~/src/a-lib";
import { StandartPopupWithContent } from "~/src/Components/Popup/StandartPopupWithContent";
import { useDispatch } from "react-redux";
import { setIsOpenProjectsModerationPage, setRefreshProjects, setStage } from "~/src/features/store/projects";
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";
import DefaultPopup from '~/src/Components/Popup/DefaultPopup';
import { StandartInput } from '@ui/Atoms/Inputs';
import { StandartButton } from '@ui/Atoms/Buttons';

interface IProps {
    project: IProject
}

const ProjectOnModeration = ({ project }: IProps): JSX.Element | null => {
    const dispatch = useDispatch();
    const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
    const [isOpenRejectionPopup, setIsOpenRejectionPopup] = useState(false);
    const [deletionReason, setDeletionReason] = useState('');
    if (!project) {
        return null;
    };
    useEffect(() => {
        dispatch(updateMainMenuFlag(false));
        dispatch(changeBackBtnVisability(false));
    }, []);
    useEffect(() => {
        dispatch(updateButtons([{
            id: 1,
            onClick: () => {
                dispatch(setStage(0));
                dispatch(setIsOpenProjectsModerationPage(false));
                dispatch(updateMainMenuFlag(true));
                dispatch(changeBackBtnVisability(true));
            },
        }]));
    }, []);
    const onApproveProject = async () => {
        await new APIRequest({
            uri: '/api/projects/moderate',
            method: TRequestMethod.POST,
            body: JSON.stringify({
                projectId: project.id,
                isModerated: 1
            })
        }).doRequest();
    };
    const onRejectProject = async () => {
        setIsOpenRejectionPopup(true);
    };
    const onDeleteWithReason = async () => {
        await new APIRequest({
            uri: '/api/projects/delete',
            method: TRequestMethod.POST,
            body: JSON.stringify({
                id: project.id,
                deletionReason,
            })
        }).doRequest();
        dispatch(setRefreshProjects(true));
    };
    const deleteProject = async () => {
        await new APIRequest({
            uri: '/api/projects/delete',
            method: TRequestMethod.POST,
            body: JSON.stringify({
                id: project.id,
            })
        }).doRequest();
        dispatch(setRefreshProjects(true));
    };

    return <>
        <WidgetWith2Items $rounded height='180px'>
            <Left style={{ flexDirection: 'column', display: 'flex', height: '100%' }} className="left">
                <ImageBlock width={'100px'} $abs style={{ marginTop: '10px' }} className="profile-block">
                    <ProjectImage src={ProjectLogo} />
                </ImageBlock>
                <STC.ProjectsData>
                    {Object.keys(project).map((key: string) => {
                        if (key === 'is_moderated') {
                            return <StandartLabel $white>Статус проекта:{
                                project[key] === 1 ? '\nПрошёл модерацию' : '\nНе рассмотрен'
                            }</StandartLabel>
                        }
                        if (key === 'complexity') {
                            const complexityNumber = project[key];
                            return <StandartLabel $white>
                                {complexityMapNumbers[complexityNumber]}
                            </StandartLabel>
                        }
                        return <StandartLabel $white>{project[key]}</StandartLabel>
                    })}
                </STC.ProjectsData>
            </Left>
            <Right className="right" style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
                <ST.ModerationBtn src={ApproveCheckMark}
                    onClick={onApproveProject}
                />
                <ST.ModerationBtn src={CrossCheckMark}
                    onClick={onRejectProject}
                />
            </Right>
        </WidgetWith2Items>
        {isOpenDeletePopup &&
            <StandartPopupWithContent
                isOpen={isOpenDeletePopup}
                updateIsOpen={setIsOpenDeletePopup}
                text='Вы действительно хотите удалить выбранный проект ?'
                firstBtn='Удалить'
                firstBtnOnClick={deleteProject}
            />
        }
        { isOpenRejectionPopup &&
            <DefaultPopup height='120px' width='350px'>
                <StandartInput
                    name={'deletion-reason'}
                    placeholder="Введите причину удаления"
                    onChange={e => setDeletionReason(e.target?.value)}
                    style={{ marginTop: 10, width: '90%' }}
                />
                <ButtonRow
                    style={{ marginLeft: 0, marginBottom: 10 }}
                >
                    <StandartButton
                        onClick={onDeleteWithReason}
                        $white
                    >
                        Удалить
                    </StandartButton>
                    <StandartButton
                        onClick={() => setIsOpenRejectionPopup(false)}
                        $white
                    >
                        Отмена
                    </StandartButton>
                </ButtonRow>
            </DefaultPopup>
        }
        </>
};

export default ProjectOnModeration;