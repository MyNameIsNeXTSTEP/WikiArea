import { useState } from "react";
import { IProject } from "~/src/a-lib";
import { TRequestMethod } from "@api-package/types";
import APIRequest from "@api-package/index";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import * as ST from './Components/Project-deatails/styled';
import { ProjectSlug as ProjectLogo } from '@ui/assets/svg';
import { Left, Right } from "@ui/Atoms/Containers";
import { ImageBlock, ProjectImage } from "@ui/Atoms/icons";
import { StandartLabel } from "@ui/Atoms/Labels";
import { complexityMapNumbers } from "~/src/a-lib";
import { StandartButton } from "@ui/Atoms/Buttons";
import { StandartPopupWithContent } from "~/src/Components/Popup/StandartPopupWithContent";

const ProjectOnModeration = (project?: IProject): JSX.Element | null => {
    const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
    if (!project) {
        return null;
    };
    const deleteProject = async () => {
        const request = {
            uri: '/api/projects/delete',
            method: TRequestMethod.POST,
            body: JSON.stringify({
                id: project.project.id,
            })
        };
        await new APIRequest(request).doRequest();
    };
    return <>
        <WidgetWith2Items $rounded height='180px'>
            <Left style={{ flexDirection: 'column', display: 'flex', height: '100%' }} className="left">
                <ImageBlock width={'100px'} $abs style={{ marginTop: '10px' }} className="profile-block">
                    <ProjectImage src={ProjectLogo} />
                </ImageBlock>
                <ST.ProjectsData>
                    {Object.keys(project.project).map((key: string) => {
                        if (key === 'is_moderated') {
                            return <StandartLabel $white>Статус проекта:{
                                project.project[key] === 1 ? 'На рассмотрении' : 'Не рассмотрен'
                            }</StandartLabel>
                        }
                        if (key === 'complexity') {
                            const complexityNumber = project.project[key];
                            return <StandartLabel $white>
                                {complexityMapNumbers[complexityNumber]}
                            </StandartLabel>
                        }
                        return <StandartLabel $white>{project.project[key]}</StandartLabel>
                    })}
                </ST.ProjectsData>
            </Left>
            <Right className="right" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <StandartButton
                    $whiteBordered
                    $width={'180px'}
                    className="subscribtion"
                    onClick={() => setIsOpenDeletePopup(true)}
                >
                    Удалить проект
                </StandartButton>
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
        </>
};

export default ProjectOnModeration;