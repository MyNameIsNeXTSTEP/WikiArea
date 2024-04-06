import { ProjectImage } from '~/src/UI-shared/Atoms/icons';
import * as ST from './styled';
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { Left, Right } from '~/src/UI-shared/Atoms/Containers';
import { StandartLabel } from '~/src/UI-shared/Atoms/Labels';
import ProjectLogo from '~/src/assets/svg/ProjectSlug.svg';
import { IProject } from './types';
import Controls from './ProjectControls/StandardProjectControls';
import { complexityMapNumbers } from '~/src/a-lib';

const StandardProject = (project?: IProject): JSX.Element | null => {
    if (!project) {
        return null;
    };

    return <WidgetWith2Items $rounded height='180px'>
        <Left height='100%' className="left">
            <ST.ImageBlock $abs className="profile-block">
                <ProjectImage src={ProjectLogo} />
            </ST.ImageBlock>
            <ST.ProjectsData>
                {Object.keys(project.project).map((key: string) => {
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
        <Right className="right">
            <Controls/>
        </Right>
    </WidgetWith2Items>
};

export default StandardProject;