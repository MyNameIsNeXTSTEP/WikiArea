import { ProjectImage } from '~/src/UI-shared/Atoms/icons';
import * as ST from './styled';
import WidgetWith2Items from "~/src/UI-shared/Organisms/Widgets/WidgetWith2Items";
import { Left, Right } from '~/src/UI-shared/Atoms/Containers';
import { StandartButton } from '~/src/UI-shared/Atoms/Buttons';
import { StandartLabel } from '~/src/UI-shared/Atoms/Labels';
import ProjectLogo from '~/src/assets/svg/ProjectSlug.svg';
import { IProject } from './types';
import { useSelector } from 'react-redux';

const StandardProject = (project?: IProject): JSX.Element | null => {
    const role = useSelector(state => state.profile.auth.role);
    if (!project) {
        return null;
    };

    const Controls = (): JSX.Element => {
        const config = {
            students: {
                option1: {
                    type: 'button',
                    buttonText: 'Подписаться',
                    action: () => console.log(1),
                },
                option2: {
                    type: 'label',
                    label: 'Подписно:'
                },
            },
            teachers: {
                option1: {
                    type: 'button',
                    buttonText: 'Редактировать',
                    action: () => console.log(2),
                },
                option2: {
                    type: 'button',
                    buttonText: 'Удалить проект',
                    action: () => console.log(3),
                }
            },
            admins: {
                option1: {
                    type: 'button',
                    buttonText: 'Просмотр',
                    action: () => console.log(4),
                },
                option2: {
                    type: 'button',
                    buttonText: 'Удалить проект',
                    action: () => console.log(5),
                }
            }
        };
        const controlState = config[role];
        return <>
            {controlState.option1.type === 'button' &&
                <StandartButton $whiteBordered $width={'180px'}>
                    {controlState.option1.buttonText}
                </StandartButton>
            }
            {controlState.option2.type === 'label' && 
                <StandartLabel style={{ marginLeft: 20 }} $white>{controlState.option2.label}</StandartLabel>
            }
            {controlState.option2.type === 'button' && 
                <StandartButton $whiteBordered $width={'180px'} style={{ marginLeft: 20 }}>{controlState.option2.buttonText}</StandartButton>
            }
        </>
    }

    return <WidgetWith2Items $rounded height='100px'>
            <Left className="left">
                <ST.ImageBlock $abs className="profile-block">
                    <ProjectImage src={ProjectLogo} />
                </ST.ImageBlock>
                <ST.ProjectsData>
                    {Object.values(project.project).map((data: string) => <StandartLabel $white>{data}</StandartLabel>)}
                </ST.ProjectsData>
            </Left>
            <Right className="right">
                <Controls/>
            </Right>
        </WidgetWith2Items>
};

export default StandardProject;