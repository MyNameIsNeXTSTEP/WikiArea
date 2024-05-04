import * as ST from './styled';
import { DownArrows } from '@ui/assets/svg';
import { Banner } from '@ui/Atoms/Banners';
import Wikiarea from './Wikiarea.png';

const WikiBanner = (): JSX.Element => {
    const onGetStarted = () => {
        document
            .getElementById('main-description')
            ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
    }

    return <Banner style={{ marginTop: '100px' }}>
        <img src={Wikiarea} style={{ width: '600px' }}/>
        <ST.Text style={{ marginTop: '60px' }}>
            Узнать больше
        </ST.Text>
        <img src={DownArrows} style={{ width: '30px', marginTop: '10px', cursor: 'pointer' }}
            onClick={onGetStarted}
        />
    </Banner>
};

export default WikiBanner;