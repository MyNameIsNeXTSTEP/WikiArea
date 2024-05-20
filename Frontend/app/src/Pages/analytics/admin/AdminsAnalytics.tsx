import { useEffect, useMemo, useState } from "react";
import { StandartButton } from "@ui/Atoms/Buttons";
import { BoundedContainer, ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { StandartLabel } from "@ui/Atoms/Labels";
import { SimpleWidget } from "@ui/Organisms/Widgets/SimpleWidget";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { EUserRoles, H1, purpleMainColor } from "@ui/Tokens";
import { useDispatch, useSelector } from "react-redux";
import { TProjectToSelect } from "../ProjectsSelector";
import { IProject } from "~/src/a-lib";
import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import groupBy from 'lodash/groupBy';
import UserSelector from "../UserSelector";
import { IProfileAuthData } from "~/src/features/store/profile";
import { setProjectsAll, setSubscribedProjectsIds } from "~/src/features/store/projects";
import { setProjectModulesAll } from "~/src/features/store/projectModule";
import StudentsAnalytics from "../student/StudentsAnalytics";
import TeachersAnalytics from "../teacher/TeachersAnalytics";

type TProjectAnalytics = {
    moduleTitle: string,
    taskPoint: number | null,
    testPoint: number | null,
}

export const AdminsAnalytics = (): JSX.Element => {
    const dispatch = useDispatch();
    const {
        projects: {
            all: projects,
            subscribedProjectsIds,
        },
        users: allUsers,
    } = useSelector(state => ({
        projects: state.projects,
        users: state.users.users,
    }));
    
    const [isOpenUserSelector, setIsOpenUserSelector] = useState(false);
    const [user, setUser] = useState({} as IProfileAuthData);
    const [projectToDraw, setProjectToDraw] = useState({} as TProjectToSelect);
    const [projectAnalytics, setProjectAnalytics] = useState([] as TProjectAnalytics[]);

    const subscribedProjects = useMemo(() =>
        projects.filter(
            (el: IProject) => subscribedProjectsIds.includes(el.id)
            ), [user]);

    const usersByRole = useMemo(() => {
        const grouped = groupBy(allUsers, 'role');
        delete grouped['admins'];
        return grouped;
    }, [allUsers]);
    
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
        if (!projectToDraw.id) return;
        const res = await new APIRequest({
            uri: '/api/users/student/get-project-analytics',
            method: TRequestMethod.GET,
            queryParams: {
                email: user.email,
                projectId: projectToDraw.id
            },
        }).doRequest();
        if (res.isSuccess && res.statusCode === 200) {
            setProjectAnalytics(res.payload);
        };
    };

    useEffect(() => {
        (async () => {
            await new APIRequest({
                uri: `/api/projects/get-all`,
                method: TRequestMethod.GET,
                queryParams: { email: user.email },
            })
            .doRequest()
            .then(res => {
                dispatch(setProjectsAll(res.payload.projects))
                dispatch(setProjectModulesAll(res.payload.modules))
                dispatch(setSubscribedProjectsIds(res.payload.subscribedProjectIds))
            });
        })();
    }, [user])
    
    useEffect(() => {
        getAnalyticsInfo();
    }, [projectToDraw]);
    
    // useEffect(() => {
    //     const chart = document.getElementById('analytics-chart')
    //     if (!chart) return;
    //     const ctx = chart.getContext('2d');
    //     const myChart = new Chart(ctx, {
    //         type: 'line',
    //         data: {
    //             labels: dataPoints.map(point => point.x),
    //             datasets: [{
    //                 label: 'Процент успеха прохождения',
    //                 data: dataPoints.map(point => point.y),
    //                 borderColor: purpleMainColor,
    //                 borderWidth: 2,
    //                 fill: false, // Specify if the area under the line should be filled
    //                 tension: 0 // This makes the line straight (a "broken" line)
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 x: {
    //                     type: 'category',
    //                     position: 'bottom'
    //                 },
    //                 y: {
    //                     beginAtZero: true
    //                 }
    //             }
    //         }
    //     });
    //     return () => myChart.destroy();
    // }, [dataPoints]);

    return <>
        <WidgetWith2Items $transparent>
            <Left>
                <H1>Аналитика</H1>
            </Left>
            <Right>
                <ButtonRow>
                    <StandartLabel
                        $bordered
                        onClick={() => setIsOpenUserSelector(!isOpenUserSelector)}
                        style={{ width: '300px', cursor: 'pointer' }}
                    >
                        { user.login || 'Выберите пользователя' }
                    </StandartLabel>
                    { isOpenUserSelector && <UserSelector setUser={setUser}/> }
                    <StandartButton>Скачать</StandartButton>
                </ButtonRow>
            </Right>
        </WidgetWith2Items>
        { user.email && user.role === EUserRoles.student && <StudentsAnalytics studentEmail={user.email}/> }
        { user.email && user.role === EUserRoles.teacher && <TeachersAnalytics teacherEmail={user.email}/> }
        {/* <BoundedContainer>
            <SimpleWidget width="100%" height="650px" $bordered style={{ alignItems: "flex-start", padding: '20px' }}>
                {
                    Object.values(user).length
                        ? <>
                            <StandartLabel>Логин: {user.login}</StandartLabel>
                            <StandartLabel>Почта: {user.email}</StandartLabel>
                        </>
                        : <StandartLabel>Информация о пользователе</StandartLabel>
                } */}
                {/* <StandartLabel>Успешноть выполнения проекта: {overallProgress}%</StandartLabel> */}
                {/* <StandartLabel>График выполнения проекта:</StandartLabel>
                <SimpleWidget width="80%" height="80%">
                    <canvas id="analytics-chart" style={{ border: 'none' }}></canvas>
                </SimpleWidget>
                <StandartLabel>
                    Информация о проекте:<br/>
                    {projectDetails.name}, {projectDetails.description}, {projectDetails.author}
                </StandartLabel> */}
            {/* </SimpleWidget>
        </BoundedContainer> */}
    </>;
};

export default AdminsAnalytics;