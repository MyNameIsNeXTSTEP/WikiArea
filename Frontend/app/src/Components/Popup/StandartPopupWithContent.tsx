import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { ButtonRow } from "../BreakLine/styled";
import DefaultPopup from "./DefaultPopup";
import { H1 } from "~/src/UI-shared/Tokens";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface IProps {
    isOpen?: boolean,
    text: string,
    firstBtn: string,
    secondBtn?: string
    firstBtnOnClick?: () => void,
    secondBtnOnClick?: () => void,
    updateIsOpen?: Dispatch<SetStateAction<boolean>>,
    image?: ReactNode | null | undefined,
    width?: string,
    height?: string,
}

const StandartPopupWithContent = ({ updateIsOpen, isOpen, text, firstBtn, secondBtn, firstBtnOnClick, secondBtnOnClick, image, width, height }: IProps): JSX.Element | null => {
    return isOpen ? <DefaultPopup width={width ?? "450px"} height={ height ?? "200px"}>
        <H1 $white>{text}</H1>
        {image}
        <ButtonRow style={{
            paddingBottom: 10,
            paddingTop: 20,
            paddingRight: 20,
            paddingLeft: 20,
            gap: 20
        }}>
            { firstBtn && <StandartButton $white onClick={firstBtnOnClick}>{firstBtn}</StandartButton> }
            { secondBtn && <StandartButton $white onClick={secondBtnOnClick}>{secondBtn}</StandartButton> }
            <StandartButton $white onClick={() => updateIsOpen(!isOpen)}>Отмена</StandartButton>
        </ButtonRow>
    </DefaultPopup> : null
};

export default StandartPopupWithContent;