import { Text } from './styled';
import { SliderCardWrapper } from './styled';

interface IProps {
    text: string,
}

const SliderCard = ({ text }: IProps): JSX.Element => {
    return <SliderCardWrapper>
        <Text>{text}</Text>
    </SliderCardWrapper>
};

export default SliderCard;