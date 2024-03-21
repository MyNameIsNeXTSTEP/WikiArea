import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { ButtonRow } from "../BreakLine/styled";
import DefaultPopup from "./DefaultPopup";
import { H1 } from "~/src/UI-shared/Tokens";
import { Dispatch, SetStateAction } from "react";

interface IProps {
    isOpen?: boolean,
    text: string,
    firstBtn: string,
    secondBtn?: string
    firstBtnOnClick?: () => void,
    secondBtnOnClick?: () => void,
    updateIsOpen?: Dispatch<SetStateAction<boolean>>,
}

const StandartPopupWithContent = ({ updateIsOpen, isOpen, text, firstBtn, secondBtn, firstBtnOnClick, secondBtnOnClick }: IProps): JSX.Element => {
    return <DefaultPopup width="450px" height="200px">
        <H1 $white>{text}</H1>
        <ButtonRow style={{
            paddingBottom: 10,
            paddingRight: 20,
            paddingLeft: 20,
            gap: 20
        }}>
            <StandartButton $white onClick={firstBtnOnClick}>{firstBtn}</StandartButton>
            {secondBtn && <StandartButton $white onClick={secondBtnOnClick}>{secondBtn}</StandartButton>}
            <StandartButton $white onClick={() => updateIsOpen(!isOpen)}>Отмена</StandartButton>
        </ButtonRow>
    </DefaultPopup>
};

export default StandartPopupWithContent;