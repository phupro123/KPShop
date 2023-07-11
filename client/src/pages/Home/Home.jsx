import { useState, useEffect, useCallback } from 'react';
import Ticket from './Ticket';
import HomeBanner from './HomeBanner';
import PromoFirst from './PromoFirst';
import PromoSecond from './PromoSecond';
import PromoThird from './PromoThird';
import { ProductHistory } from '../../components/DisplayProduct';

const Home = ({ title }) => {
    const [displayTicket, setDisplayTicket] = useState(false);

    useEffect(() => {
        document.title = title;
        const handleScroll = () => {
            setDisplayTicket(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div>
            <Ticket show={displayTicket} />
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
