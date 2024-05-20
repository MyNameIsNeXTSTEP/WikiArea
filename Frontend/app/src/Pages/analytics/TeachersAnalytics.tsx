import { useCallback, useEffect, useMemo, useState } from "react";
import maxBy from 'lodash/maxBy';
import find from 'lodash/find';
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
import Projects from "./TeacherAnalyticsProjectsList";

interface IProps {
    teacherEmail?: string,
};

type TProjectAnalytics = {
    moduleTitle: string,
    taskPoint: number | null,
    testPoint: number | null,
};

type TOverallModuleAnalytics = {
    module_id: number,
    project_name: string,
    project_id: number,
    module_title: string,
    total_points: string | number,
};

type TSubscriptionAnalytics = {
    id: number,
    name: string,
    subscriptions: number
}

type TResponseData = {
    overallModuleAnalytics: TOverallModuleAnalytics[],
    subscriptionAnalytics: TSubscriptionAnalytics[],
};

export const TeachersAnalytics = ({ teacherEmail }: IProps): JSX.Element => {
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
    const [popullarProjectToShow, setPopullarProjectToShow] = useState({} as IProject);
    const [successfulProjectToShow, setSuccessfulProjectToShow] = useState({} as IProject);
    const [projectAnalytics, setProjectAnalytics] = useState([] as TProjectAnalytics[]);

    const dataPoints = projectAnalytics.map(el => {
        let divider = 2;
        if (!el.taskPoint || !el.testPoint) divider = 1;
        return {
            x: el.moduleTitle,
            y: (Number(el.taskPoint) + Number(el.testPoint)) / divider,
        }
    });
    const projectPassSuccess = dataPoints.reduce((acc, curr) => acc + curr.y, 0) / dataPoints.length;
    // const projectDetails = useMemo(() => {
    //     const currentProject = subscribedProjects.find(el => el.id === projectToDraw.id);
    //     if (!currentProject) return {};
    //     const { name, description, author } = currentProject;
    //     return { name, description, author };
    // }, [projectToDraw]);
    
    const getAnalyticsInfo = useCallback(async () => {
        const res = await new APIRequest({
            uri: '/api/users/teacher/get-analytics',
            method: TRequestMethod.GET,
        }).doRequest<TResponseData>();

        if (res.isSuccess && res.statusCode === 200) {
            const { overallModuleAnalytics, subscriptionAnalytics } = res.payload;
            const projectWithMaxModulePoints = maxBy<TOverallModuleAnalytics>(overallModuleAnalytics, obj => obj.total_points);
            const projectWithMaxSubscriptions = maxBy<TSubscriptionAnalytics>(subscriptionAnalytics, obj => obj.subscriptions);
            if (projectWithMaxModulePoints) {
                const projectToshow = find(projects, { id: projectWithMaxModulePoints.project_id});
                console.log(projectToshow);
                setSuccessfulProjectToShow(projectToshow);
            };
            if (projectWithMaxSubscriptions) {
                const projectToshow = find(projects, { id: projectWithMaxSubscriptions.id});
                setPopullarProjectToShow(projectToshow);
            }
        };
    }, []);
    
    useEffect(() => {
        getAnalyticsInfo().then();
    }, []);
 
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
        {/* Show only for the teacher role */}
        { !teacherEmail && (popullarProjectToShow || successfulProjectToShow) &&
            <Projects
                popullarProjectToShow={popullarProjectToShow}
                successfulProjectToShow={successfulProjectToShow}
            />
        }
        <WidgetWith2Items $transparent>
            <Left>
                <H1>Аналитика</H1>
            </Left>
            <Right>
                <ButtonRow>
                    <StandartLabel
                        $bordered
                        onClick={() => setIsOpenProjectsSelector(!isOpenProjectsSelector)}
                        style={{ width: '200px', cursor: 'pointer' }}
                    >
                        {/* { projectToDraw.name || 'Выбрать проект' } */}
                    </StandartLabel>
                    {/* { isOpenProjectsSelector &&
                        <ProjectsSelector
                            projects={subscribedProjects}
                            setProject={setProjectToDraw}
                        />
                    } */}
                    <StandartButton>Скачать</StandartButton>
                </ButtonRow>
            </Right>
        </WidgetWith2Items>
        <BoundedContainer>
            <SimpleWidget width="100%" height="650px" $bordered style={{ alignItems: "flex-start", padding: '20px' }}>
                <StandartLabel>Успешноть выполнения проекта: {projectPassSuccess}%</StandartLabel>
                <StandartLabel>График выполнения проекта:</StandartLabel>
                    <SimpleWidget width="80%" height="80%">
                        <canvas id="analytics-chart" style={{ border: 'none' }}></canvas>
                    </SimpleWidget>
                {/* <StandartLabel>
                    Информация о проекте:<br/>
                    {projectDetails.name}, {projectDetails.description}, {projectDetails.author}
                </StandartLabel> */}
            </SimpleWidget>
        </BoundedContainer>
    </>;
};

export default TeachersAnalytics;