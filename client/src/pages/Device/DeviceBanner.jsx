import { Mousewheel, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../assets/swiper.scss';

const images = [
    '//cdn.tgdd.vn/2022/07/banner/800-200-800x200-22.png',
    '//cdn.tgdd.vn/2022/07/banner/800-200-800x200-18.png',
    '//cdn.tgdd.vn/2022/06/banner/18-imac-800-200-800x200.png',
    '//cdn.tgdd.vn/2022/07/banner/800-200-800x200-42.png',
    '//cdn.tgdd.vn/2022/07/banner/18-intel-800-200-800x200.png',
];
const DeviceBanner = () => {
    return (
        <div className="flex w-[1200px] mx-auto items-center space-x-6">
            <div className="w-[800px]">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={16}
                    navigation
                    mousewheel={{
                        sensitivity: 0,
                    }}
                    loop={true}
                    modules={[Navigation, Mousewheel]}
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-[800px]">
                                <a href="">
                                    <img className="rounded-xl" src={src} alt="" />
                                </a>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="flex flex-col space-y-6 h-[200px] grow">
                <div>
                    <a href="">
                        <img
                            src="//cdn.tgdd.vn/2022/05/banner/sticky-intel-390-97-390x97.png"
                            alt=""
                            className="h-[88px] rounded-xl w-full"
                        />
                    </a>
                </div>
                <div>
                    <a href="">
                        <img
                            src="//cdn.tgdd.vn/2022/06/banner/Xa-hang-Laptop-2-390x97-1.png"
                            alt=""
                            className="h-[88px] rounded-xl w-full"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DeviceBanner;
