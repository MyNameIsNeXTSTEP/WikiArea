import * as ST from './styled';
import { ProjectSlug as ProjectLogo } from '@ui/assets/svg';
import { Left } from "@ui/Atoms/Containers";
import { ImageBlock, ProjectImage } from "@ui/Atoms/icons";
import { StandartLabel } from '@ui/Atoms/Labels';
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { IProject } from "~/src/a-lib";

interface IProps {
    project?: IProject,
}

const ProjectDetails = ({ project }: IProps): JSX.Element | null => {
    if (!project) {
        return null;
    }
    return <WidgetWith2Items $rounded height='180px'>
            <Left className="left">
                <ImageBlock $abs className="profile-block">
                    <ProjectImage src={ProjectLogo} />
                </ImageBlock>
                <ST.ProjectsData>
                    {Object.values(project).map((data: string) => <StandartLabel $white>{data}</StandartLabel>)}
                </ST.ProjectsData>
            </Left>
        </WidgetWith2Items>
};

export default ProjectDetails;