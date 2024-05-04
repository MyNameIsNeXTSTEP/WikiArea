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
            text: `🚀 Интерактивные инструменты: Обеспечьте вовлеченность и активное участие студентов с помощью наших интерактивных инструментов, способствующих эффективному обучению.`
        }, {
            text: `🔒 Безопасность и конфиденциальность: Мы ценим безопасность ваших данных, обеспечивая высокий уровень конфиденциальности и защиты информации на платформе.`
        }, {
            text: `📊 Гибкий анализ: Получайте уникальные аналитические данные о прогрессе проектов, оценках студентов и других ключевых аспектах для улучшения образовательного процесса.`
        }, {
            text: `🌐 Удобство в использовании: Интуитивно понятный интерфейс и доступность на всех устройствах обеспечивают комфортное взаимодействие с платформой.`
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
            </Carousel>
        );
    }
};

export default StyledCarousel;