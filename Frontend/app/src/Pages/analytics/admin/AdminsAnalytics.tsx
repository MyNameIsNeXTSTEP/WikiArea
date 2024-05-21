import { useEffect, useState } from "react";
import { StandartButton } from "@ui/Atoms/Buttons";
import { ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { StandartLabel } from "@ui/Atoms/Labels";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { EUserRoles, H1 } from "@ui/Tokens";
import { useDispatch } from "react-redux";
import APIRequest from "@api-package/index";
import { TRequestMethod } from "@api-package/types";
import UserSelector from "../UserSelector";
import { IProfileAuthData } from "~/src/features/store/profile";
import { setProjectsAll, setSubscribedProjectsIds } from "~/src/features/store/projects";
import { setProjectModulesAll } from "~/src/features/store/projectModule";
import StudentsAnalytics from "../student/StudentsAnalytics";
import TeachersAnalytics from "../teacher/TeachersAnalytics";
import { setStage } from "~/src/features/store/analytics";

export const AdminsAnalytics = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isOpenUserSelector, setIsOpenUserSelector] = useState(false);
    const [user, setUser] = useState({} as IProfileAuthData);

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
        if (user.login && user.role === EUserRoles.teacher) dispatch(setStage(1));
    }, [user]);
    
    return <>
        <WidgetWith2Items $transparent>
            <Left>
                <H1>{user.login ? '' : 'Аналитика'}</H1>
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
        { user.login && user.role === EUserRoles.teacher && <TeachersAnalytics teacherLogin={user.login}/> }
    </>;
};

export default AdminsAnalytics;