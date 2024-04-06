import { StandartButton } from "~/src/UI-shared/Atoms/Buttons";
import { ButtonRow } from "../BreakLine/styled";
import DefaultPopup from "./DefaultPopup";
import { H1 } from "~/src/UI-shared/Tokens";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Cancel } from "./styled";

export interface IPopupProps {
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
    children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[],
}

interface IRawPopupProps {
    isOpen?: boolean,
    textObj: Record<string, string>,
    updateIsOpen?: any,
    width?: string,
    height?: string,
    elements?: [any],
    defaultText?: string,
    children?: ReactNode | ReactNode[] | JSX.Element | JSX.Element[],
}

export const StandartPopupWithContent = ({ updateIsOpen, isOpen, text, firstBtn, secondBtn, firstBtnOnClick, secondBtnOnClick, image, width, height, ...rest }: IPopupProps): JSX.Element | null => {
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
            {rest.children}
            <StandartButton $white onClick={() => updateIsOpen(!isOpen)}>Отмена</StandartButton>
        </ButtonRow>
    </DefaultPopup> : null
};

export const RawPopupWithElements = ({ updateIsOpen, isOpen, textObj, width, height, elements, defaultText }: IRawPopupProps): JSX.Element | null => {
    return isOpen
        ? <DefaultPopup width={width ?? "450px"} height={ height ?? "200px"}>
            { updateIsOpen && <Cancel size={20} color={'white'} onClick={() => updateIsOpen({ isOpen: false })}/> }
            {elements && elements?.length > 0
                ? elements.map(el => {
                    return <>
                        <H1 $underlined $white>{textObj.title}</H1>
                        <p>{el.name}</p>
                        <H1 $underlined $white>{textObj.text}</H1>
                        <p>{el.forText}</p>
                    </>})
                : <p>{defaultText}</p>
            }
        </DefaultPopup>
        : null
};