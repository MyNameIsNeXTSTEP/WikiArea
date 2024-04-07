import { Left, Right } from "~/src/UI-shared/Atoms/Containers";
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";

const ProjectEditWidget = (): JSX.Element => {
    return <>
        <WidgetWith2Items>
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
    </>
};

export default ProjectEditWidget;