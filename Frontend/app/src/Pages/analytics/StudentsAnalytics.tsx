import { useEffect, useMemo, useState } from "react";
import { StandartButton } from "@ui/Atoms/Buttons";
import { BoundedContainer, ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { StandartLabel } from "@ui/Atoms/Labels";
import { SimpleWidget } from "@ui/Organisms/Widgets/SimpleWidget";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { H1, purpleMainColor } from "@ui/Tokens";
import { useSelector } from "react-redux";
import ProjectsSelector, { TProjectToSelect } from "./ProjectsSelector";
import { IProject } from "~/src/a-lib";
import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";

interface IProps {
    studentEmail?: string,
}

type TProjectAnalytics = {
    moduleTitle: string,
    taskPoint: number | null,
    testPoint: number | null,
}

export const StudentsAnalytics = ({ studentEmail }: IProps): JSX.Element => {
    const {
        projects: {
            all: projects,
            subscribedProjectsIds,
        },
        email,
    } = useSelector(state => ({
        projects: state.projects,
        email: state.profile.auth.email,
    }));
    const [isOpenProjectsSelector, setIsOpenProjectsSelector] = useState(false);
    const [projectToDraw, setProjectToDraw] = useState({} as TProjectToSelect);
    const [projectAnalytics, setProjectAnalytics] = useState([] as TProjectAnalytics[]);

    const subscribedProjects = useMemo(() =>
        projects.filter((el: IProject) => subscribedProjectsIds.includes(el.id))
    , [subscribedProjectsIds, projects]);

    const dataPoints = projectAnalytics.map(el => {
        let divider = 2;
        if (!el.taskPoint || !el.testPoint) divider = 1;
        return {
            x: el.moduleTitle,
            y: (Number(el.taskPoint) + Number(el.testPoint)) / divider,
        }
    });

    const overallProgress = dataPoints.reduce((acc, curr) => acc + curr.y, 0) / dataPoints.length;

    const projectDetails = useMemo(() => {
        const currentProject = subscribedProjects.find(el => el.id === projectToDraw.id);
        if (!currentProject) return {};
        const { name, description, author } = currentProject;
        return { name, description, author };
    }, [projectToDraw]);
    
    const getAnalyticsInfo = async () => {
        const res = await new APIRequest({
            uri: '/api/users/student/get-project-analytics',
            method: TRequestMethod.GET,
            queryParams: {
                email: studentEmail ?? email,
                projectId: projectToDraw.id
            },
        }).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            setProjectAnalytics(res.payload);
        };
    };
    
    useEffect(() => {
        getAnalyticsInfo();
    }, [projectToDraw]);
    
    useEffect(() => {
        const ctx = document.getElementById('analytics-chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dataPoints.map(point => point.x),
                datasets: [{
                    label: 'Процент успеха прохождения',
                    data: dataPoints.map(point => point.y),
                    borderColor: purpleMainColor,
                    borderWidth: 2,
                    fill: false, // Specify if the area under the line should be filled
                    tension: 0 // This makes the line straight (a "broken" line)
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                        position: 'bottom'
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return () => myChart.destroy();
    }, [dataPoints]);

    return <>
        <WidgetWith2Items $transparent>
            <Left>
                { !studentEmail && <H1>Аналитика</H1> }
            </Left>
            <Right>
                <ButtonRow>
                    <StandartLabel
                        $bordered
                        onClick={() => setIsOpenProjectsSelector(!isOpenProjectsSelector)}
                        style={{ width: '300px', cursor: 'pointer' }}
                    >
                        { projectToDraw.name || 'Выбрать проект' }
                    </StandartLabel>
                    { isOpenProjectsSelector &&
                        <ProjectsSelector
                            projects={subscribedProjects}
                            setProject={setProjectToDraw}
                        />
                    }
                    <StandartButton>Скачать</StandartButton>
                </ButtonRow>
            </Right>
        </WidgetWith2Items>
        <BoundedContainer>
            <SimpleWidget width="100%" height="650px" $bordered style={{ alignItems: "flex-start", padding: '20px' }}>
                <StandartLabel>Успешноть выполнения проекта: {overallProgress}%</StandartLabel>
                <StandartLabel>График выполнения проекта</StandartLabel>
                    <SimpleWidget width="80%" height="80%">
                        <canvas id="analytics-chart" style={{ border: 'none' }}></canvas>
                    </SimpleWidget>
                <StandartLabel
                    style={{ textAlign: 'start'}}
                >
                    Информация о проекте:<br/>
                    {projectDetails.name || 'Без названия'}, {projectDetails.description || 'Без описания'}, {projectDetails.author || 'Автор не указан'}
                </StandartLabel>
            </SimpleWidget>
        </BoundedContainer>
    </>;
};

export default StudentsAnalytics;