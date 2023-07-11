import '../../assets/swiper.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LoadingSkeleton from '../../components/Loading/LoadingSkeleton';

const HomeBannerItem = ({ src }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="">
            <Link to="/">
                {isLoading ? (
                    <LoadingSkeleton className="h-[350px] w-full" />
                ) : (
                    <img src={src} alt="" className="w-full h-[350px] object-fill rounded-xl" />
                )}
            </Link>
        </div>
    );
};

export default HomeBannerItem;
