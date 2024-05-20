import styled from "styled-components";
import { StandartLabel } from "@ui/Atoms/Labels";
import ProjectDetails from "../projects/Components/Project-deatails/ProjetcDetails";
import { IProject } from "~/src/a-lib";
import WidgetWith2Items from "@ui/Organisms/Widgets/WidgetWith2Items";
import { ButtonRow, Left, Right } from "@ui/Atoms/Containers";
import { H1 } from "@ui/Tokens";
import { StandartButton } from "@ui/Atoms/Buttons";
import { useDispatch } from "react-redux";
import { setIsShowPopularityAnalytics, setIsShowSuccessAnalytics, setStage } from "~/src/features/store/analytics";
import { changeBackBtnVisability, updateButtons, updateMainMenuFlag } from "~/src/features/store/menu";

interface IProps {
    successfulProjectToShow: IProject,
    popullarProjectToShow: IProject,
};

const StyledLabel = styled(StandartLabel)`
    display: block;
    width: 100%;
    text-align: start;
    margin-left: 6em;
`;

const StyledWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: 'flex';
    flex-direction: column;
`;

const Projects = ({ successfulProjectToShow, popullarProjectToShow }: IProps): JSX.Element => {
    const dispatch = useDispatch();

    const onOpenPopularityAnalytics = () => {
        dispatch(setStage(1));
        dispatch(setIsShowPopularityAnalytics(true));
        dispatch(updateMainMenuFlag(false));
        dispatch(changeBackBtnVisability(false));
        dispatch(updateButtons([{
            id: 1,
            onClick: () => {
                dispatch(updateMainMenuFlag(true));
                dispatch(changeBackBtnVisability(true));
                dispatch(setStage(0));
                dispatch(setIsShowPopularityAnalytics(false));
            },
        }]));
    };

    const onOpenSuccessAnalytics = () => {
        dispatch(setStage(1));
        dispatch(setIsShowSuccessAnalytics(true));
        dispatch(updateMainMenuFlag(false));
        dispatch(changeBackBtnVisability(false));
        dispatch(updateButtons([{
            id: 1,
            onClick: () => {
                dispatch(updateMainMenuFlag(true));
                dispatch(changeBackBtnVisability(true));
                dispatch(setStage(0));
                dispatch(setIsShowSuccessAnalytics(false));
            },
        }]));
    };
    
    return <>
        <WidgetWith2Items $transparent>
            <Left>
                <H1>Аналитика</H1>
            </Left>
            <Right>
                <ButtonRow>
                    <StandartButton
                        $width="270px"
                        onClick={onOpenPopularityAnalytics}
                    >
                        Популярность проектов
                    </StandartButton>
                    <StandartButton
                        $width="370px"
                        onClick={onOpenSuccessAnalytics}
                    >
                        Успешность выполнения проектов
                    </StandartButton>
                </ButtonRow>
            </Right>
        </WidgetWith2Items>
        <StyledWrapper>
            <StyledLabel>
                Самый успешный проект:
            </StyledLabel>
            <ProjectDetails project={successfulProjectToShow}/>

            <StyledLabel>
                Самый популярный проект:
            </StyledLabel>
            <ProjectDetails project={popullarProjectToShow}/>
        </StyledWrapper>
    </>
};

export default Projects;