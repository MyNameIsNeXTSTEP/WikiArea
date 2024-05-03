import { ImageBlock, ProjectImage } from '@ui/Atoms/icons';
import * as ST from './styled';
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { Left, Right } from '@ui/Atoms/Containers';
import { StandartLabel } from '@ui/Atoms/Labels';
import { ProjectSlug as ProjectLogo } from '@ui/assets/svg';
import { IProject } from '~/src/a-lib/index';
import Controls from './Components/ProjectControls/StandardProjectControls';
import { complexityMapNumbers } from '~/src/a-lib';

interface IProps {
    project?: IProject,
}

const StandardProject = ({ project }: IProps): JSX.Element | null => {
    if (!project) {
        return null;
    };

    return <WidgetWith2Items $rounded height='180px'>
        <Left height='100%' className="left">
            <ImageBlock $abs className="profile-block">
                <ProjectImage src={ProjectLogo} />
            </ImageBlock>
            <ST.ProjectsData>
                {Object.keys(project).map((key: string) => {
                    if (key === 'complexity') {
                        const complexityNumber = project[key];
                        return <StandartLabel $white>
                            {complexityMapNumbers[complexityNumber]}
                        </StandartLabel>
                    }
                    return <StandartLabel $white>{project[key]}</StandartLabel>
                })}
            </ST.ProjectsData>
        </Left>
        <Right className="right">
            <Controls project={project}/>
        </Right>
    </WidgetWith2Items>
};

export default StandardProject;