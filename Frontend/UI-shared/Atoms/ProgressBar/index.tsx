import styled from "styled-components";
import { purpleMainColor } from "../../Tokens";

const ProgressBarWrapper = styled.div`
    display: block;
    width: 60%;
    height: 30px;
    border: 2px solid ${purpleMainColor};
    border-radius: 15px;
    margin: auto;
    top: 0;
    margin-top: 40px;
`;

const ProgressBarInner = styled.span<{ width: number }>`
    display: block;
    position: relative;
    left: 0;
    margin: 0;
    height: 26px;
    width: ${p => `${p.width}px`};
    border-radius: 13px;
    background-color: ${purpleMainColor};
`;

interface IProps {
    width: number;
}

const ProgressBar = ({ width }: IProps): JSX.Element => {
    return <ProgressBarWrapper id="progress-bar-wrapper">
        <ProgressBarInner width={width} id="progress-bar-inner"/>
    </ProgressBarWrapper>
};

export default ProgressBar;