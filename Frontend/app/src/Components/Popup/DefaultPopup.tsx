import { ReactElement, ReactNode } from "react";
import styled from "styled-components";
import { purpleMainColor } from "~/src/UI-shared/Tokens";
import useGlobalDOMEvents from "~/src/a-lib";

interface IProps {
    props?: {
        width?: string;
        height?: string;
    };
    children?: ReactElement | ReactElement[] | ReactNode | ReactNode[];
}

const ModalWrapper = styled.div`
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.5); /* Black w/ opacity */
`;

const Container = styled.dialog<{ width?: string, height?: string}>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${purpleMainColor};
    width: ${p => p.width || '300px'};
    height: ${p => p.height|| 'auto'};
    border: 5px solid white;
    border-radius: 20px;
    align-self: flex-end;
    z-index: 1000;
    #post-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const DefaultPopup = ({ children, ...props }: IProps): JSX.Element => {
    const modal = document.getElementById('modal-wrapper');
    useGlobalDOMEvents({
        click(ev) {
            if (modal) {
                modal.style.display = "none"; // @todo: does not work!
            }
        },
    });
    return <ModalWrapper id="modal-wrapper" className="modal">
        <Container {...props}>{children}</Container>
    </ModalWrapper>
};

export default DefaultPopup;