// import { StyledCarousel } from "./styled";

// const SliderList = () => {
//     return (
//         <StyledCarousel>
//             <div>
//                 <p className="legend">Legend 1</p>
//             </div>
//             <div>
//                 <p className="legend">Legend 2</p>
//             </div>
//             <div>
//                 <p className="legend">Legend 3</p>
//             </div>
//         </StyledCarousel>
//     );
// };

// export default SliderList;
import { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import SliderCard from './SliderCard';

// @note: Class component is a copy-paste just for minified lib styles to work with
class StyledCarousel extends Component {
    render() {
        const cards = [{
            text: 'test1'
        }, {
            text: 'test2'
        }, {
            text: 'test3'
        }, {
            text: 'test4'
        }, {
            text: 'test5'
        }]
        return (
            <Carousel
                centerMode
                centerSlidePercentage={60}
                emulateTouch={true}
                showArrows={false}
                showStatus={false}
                showThumbs={false}
            >
                {cards.map(card => <SliderCard text={card.text}/>)}
                {/* <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div> */}
            </Carousel>
        );
    }
};

export default StyledCarousel;