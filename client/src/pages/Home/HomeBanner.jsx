import { Mousewheel, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../assets/swiper.scss';
import HomeBannerItem from './HomeBannerItem';

const slider = [
    'https://lzd-img-global.slatic.net/g/skyline/i8/181bae37497e49ebba4f2312d75f2a63-1360-480.jpg_2200x2200q75.jpg_.webp',
    'https://cf.shopee.vn/file/36ac1ea8ffce66d9d0e239c947d3538b',
    'https://cf.shopee.vn/file/6fa078a7264069a1502f46a26c2c4178',
    'https://cpn.vn/product_images/uploaded_images/dthoai-banner.png',
    'https://cf.shopee.ph/file/ddc2d75ce2742111f4025666a88ec059',
    'https://cf.shopee.vn/file/39684aa40e2666ebf61d2bdbcbbcb735',
];

const HomeBanner = () => {
    return (
        <div className="relative">
            <Swiper
                slidesPerView={1}
                spaceBetween={4}
                navigation
                mousewheel={{
                    sensitivity: 0,
                }}
                loop={true}
                modules={[Navigation, Mousewheel]}
            >
                {slider.map((src, index) => (
                    <SwiperSlide key={index}>
                        <HomeBannerItem src={src} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HomeBanner;
