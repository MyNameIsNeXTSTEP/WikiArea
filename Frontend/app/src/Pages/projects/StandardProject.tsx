import { ImageBlock, ProjectImage } from '~/src/UI-shared/Atoms/icons';
import * as ST from './styled';
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { Left, Right } from '~/src/UI-shared/Atoms/Containers';
import { StandartLabel } from '~/src/UI-shared/Atoms/Labels';
import ProjectLogo from '~/src/assets/svg/ProjectSlug.svg';
import { IProject } from '~/src/a-lib/index';
import Controls from './ProjectControls/StandardProjectControls';
import { complexityMapNumbers } from '~/src/a-lib';

// @todo: Use an IProps with { project } destructuring in the component props acceptance
// for accessing props of a project directly, instead of `project.project`
const StandardProject = (project?: IProject): JSX.Element | null => {
    if (!project) {
        return null;
    };

    return <WidgetWith2Items $rounded height='180px'>
        <Left height='100%' className="left">
            <ImageBlock $abs className="profile-block">
                <ProjectImage src={ProjectLogo} />
            </ImageBlock>
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
            <Controls project={project.project}/>
        </Right>
    </WidgetWith2Items>
};

export default StandardProject;