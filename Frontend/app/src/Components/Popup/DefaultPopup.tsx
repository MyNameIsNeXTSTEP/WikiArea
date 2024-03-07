import { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { purpleMainColor } from "~/src/UI-shared/Tokens";

interface IProps {
    children?: ReactElement | ReactElement[] | ReactNode | ReactNode[];
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${purpleMainColor};
    width: 300px;
    height: auto;
    border: 5px solid white;
    border-radius: 20px;
    align-self: flex-end;
    top: 0;
    position: absolute;
    z-index: 1000;
    margin-top: 20px;
    margin-right: 10px;
    #post-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const DefaultPopup = ({ children }: IProps): JSX.Element => {
    return <Container>{children}</Container>
};

export default DefaultPopup;