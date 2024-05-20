import { useCallback, useEffect, useMemo, useState } from "react";
import maxBy from 'lodash/maxBy';
import find from 'lodash/find';
import { StandartButton } from "@ui/Atoms/Buttons";
import { BoundedContainer, ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { StandartLabel } from "@ui/Atoms/Labels";
import { SimpleWidget } from "@ui/Organisms/Widgets/SimpleWidget";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { H1, purpleMainColor } from "@ui/Tokens";
import { useDispatch, useSelector } from "react-redux";
import ProjectsSelector, { TProjectToSelect } from "../ProjectsSelector";
import { IProject } from "~/src/a-lib";
import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import Projects from "./TeacherAnalyticsProjectsList";
import PopularityChart from "./PopularityChart";
import SuccessChart from "./SuccessChat";
import { setPopularAnalytics, setStage, setSuccessfulAnalytics } from "~/src/features/store/analytics";

interface IProps {
    teacherEmail?: string,
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
        analyticsPage: {
            stage,
            isShowPopularityAnalytics,
            isShowSuccessAnalytics,
        }
    } = useSelector(state => ({
        projects: state.projects,
        email: state.profile.auth.email,
        analyticsPage: state.pages.analytics,
    }));
    const dispatch = useDispatch();
    const [popularProjectToShow, setPopularProjectToShow] = useState({} as IProject);
    const [successfulProjectToShow, setSuccessfulProjectToShow] = useState({} as IProject);

    const getAnalyticsInfo = useCallback(async () => {
        const res = await new APIRequest({
            uri: '/api/users/teacher/get-analytics',
            method: TRequestMethod.GET,
        }).doRequest<TResponseData>();

        if (res.isSuccess && res.statusCode === 200) {
            const { overallModuleAnalytics, subscriptionAnalytics } = res.payload;
            dispatch(setPopularAnalytics(subscriptionAnalytics));
            dispatch(setSuccessfulAnalytics(overallModuleAnalytics));
            const projectWithMaxModulePoints = maxBy<TOverallModuleAnalytics>(overallModuleAnalytics, obj => obj.total_points);
            const projectWithMaxSubscriptions = maxBy<TSubscriptionAnalytics>(subscriptionAnalytics, obj => obj.subscriptions);
            if (projectWithMaxModulePoints) {
                const projectToshow = find(projects, { id: projectWithMaxModulePoints.project_id});
                setSuccessfulProjectToShow(projectToshow);
            };
            if (projectWithMaxSubscriptions) {
                const projectToshow = find(projects, { id: projectWithMaxSubscriptions.id});
                setPopularProjectToShow(projectToshow);
            }
        };
    }, []);
    
    useEffect(() => {
        dispatch(setStage(0));
        getAnalyticsInfo().then();
    }, []);
 
    return <>
        {/* Show only for the teacher role */}
        { !teacherEmail && stage === 0 && (popularProjectToShow || successfulProjectToShow) &&
            <Projects
                popularProjectToShow={popularProjectToShow}
                successfulProjectToShow={successfulProjectToShow}
            />
        }
        { stage === 1 && isShowPopularityAnalytics && <PopularityChart/> }
        { stage === 1 && isShowSuccessAnalytics && <SuccessChart/> }
    </>;
};

export default TeachersAnalytics;