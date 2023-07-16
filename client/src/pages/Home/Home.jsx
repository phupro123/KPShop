import HomeBanner from './HomeBanner';
import PromoFirst from './PromoFirst';
import PromoSecond from './PromoSecond';
import PromoThird from './PromoThird';
import { ProductHistory } from '../../components/DisplayProduct';

const Home = ({ title }) => {
    return (
        <div>
            <div className="w-[1200px] mx-auto flex flex-col space-y-6 py-6">
                <HomeBanner />
                <PromoFirst />
                <PromoSecond />
                <PromoThird />
                <ProductHistory />
            </div>
        </div>
    );
};
export default Home;
