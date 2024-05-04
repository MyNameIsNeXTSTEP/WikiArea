import { purpleMainColor } from '@ui/Tokens';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';

export const StyledCarousel = styled(Carousel)`
    display: block;
    width: 100%;
`;

export const SliderCardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 400px;
    margin: 10px;
    border-radius: 10px;
    background-color: white;
`;

export const Text = styled.p`
    color: ${purpleMainColor};
`;
