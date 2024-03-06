import { SliderCardWrapper } from './styled';

interface IProps {
    text: string,
}

const SliderCard = ({ text }: IProps): JSX.Element => {
    return <SliderCardWrapper>
        <p>{text}</p>
    </SliderCardWrapper>
};

export default SliderCard;