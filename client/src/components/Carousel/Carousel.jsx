import { Mousewheel, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../assets/swiper.scss';
import { Link } from 'react-router-dom';
import ProductCard from '../DisplayProduct/ProductCard';
import LoadingSkeleton from '../Loading/LoadingSkeleton';
import { twMerge } from 'tailwind-merge';
import ProductCardSkeleton from '../DisplayProduct/ProductCardSkeleton';

const Carousel = ({ isLoading, data, slidesPerView = 5, spaceBetween = 16, isProduct = true, isBorder }) => {
    return (
        <div className="w-full">
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                navigation
                mousewheel={{
                    sensitivity: 0,
                }}
                loop={true}
                modules={[Navigation, Mousewheel]}
            >
                {isLoading && (
                    <div
                        className={twMerge('w-full rounded-xl grid gap-4', isProduct ? 'h-[440px]' : 'h-[200px]')}
                        style={{ gridTemplateColumns: `repeat(${slidesPerView}, minmax(0, 1fr))` }}
                    >
                        {Array.from({ length: slidesPerView }).map((_, index) => (
                            <div key={index}>
                                {isProduct ? (
                                    <div
                                        className={twMerge(
                                            'w-full bg-white h-[440px]',
                                            isBorder && 'border p-4 rounded-md',
                                        )}
                                    >
                                        <ProductCardSkeleton />
                                    </div>
                                ) : (
                                    <LoadingSkeleton className="w-full h-full rounded-xl" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {!isLoading &&
                    data.map((product, index) => (
                        <SwiperSlide key={index}>
                            {isProduct ? (
                                <div className="w-full bg-white rounded-xl h-[440px]">
                                    <ProductCard data={product} isBorder={isBorder} />
                                </div>
                            ) : (
                                <Link to="/">
                                    <img src={product} alt="" className="w-full h-[200px] object-fill rounded-xl" />
                                </Link>
                            )}
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default Carousel;
