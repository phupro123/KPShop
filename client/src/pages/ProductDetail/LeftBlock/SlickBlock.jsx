import { Mousewheel, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../assets/swiper.scss';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineFavorite } from 'react-icons/md';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { toast } from 'react-toastify';
import { _addWishList } from '../../../redux/user/userApi';
import { useMemo } from 'react';
import { LoadingSkeleton } from '../../../components/Loading';
import { login } from '../../../redux/user/userSlice';
import { createAxios } from '../../../api/createInstance';

const SlickBlock = ({ isLoading, phoneData }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.currentUser);

    const gallery = useMemo(() => {
        if (!phoneData) {
            return;
        }
        return [phoneData.img, ...phoneData.gallery];
    }, [phoneData]);
    let axiosJWT = createAxios(user, dispatch, login);

    const handleAddFavoriteList = useCallback(() => {
        if(user==null){
            toast.info("Vui lòng đăng nhập")
        }
        else{
            _addWishList(dispatch, {
                _id: user._id,
                prodId: phoneData?._id,
            },axiosJWT);
            if (user?.wishlist.some((item) => item._id === phoneData?._id)) {
                toast.success('Bạn đã xóa sản phẩm khỏi danh sách yêu thích');
                return;
            }
            toast.success('Bạn đã thêm sản phẩm vào danh sách yêu thích thành công');
        }
       
    }, [dispatch, user, phoneData, toast]);

    return (
        <div className="border p-4 relative">
            {isLoading ? (
                <>
                    <LoadingSkeleton className="w-[566px] h-96 mb-8" />
                    <div className="flex justify-between">
                        <LoadingSkeleton className="w-20 h-20" />
                        <LoadingSkeleton className="w-20 h-20" />
                        <LoadingSkeleton className="w-20 h-20" />
                        <LoadingSkeleton className="w-20 h-20" />
                        <LoadingSkeleton className="w-20 h-20" />
                    </div>
                </>
            ) : (
                <>
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
                        {gallery?.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={image || ''} alt="" className="w-full h-96 mb-8 object-scale-down" />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="flex justify-between">
                        {gallery?.slice(0, 5).map((image, index) => (
                            <img key={index} src={image} alt="" className="object-cover w-20 h-20" />
                        ))}
                    </div>
                </>
            )}
            <button
                className={twMerge(
                    'absolute top-4 right-4 z-10 flex flex-col items-center justify-center text-gray-500',
                    user?.wishlist.some((item) => item._id === phoneData?._id) && 'text-primary-500',
                )}
                onClick={handleAddFavoriteList}
            >
                {!isLoading && <MdOutlineFavorite size={32} />}
            </button>
        </div>
    );
};

export default SlickBlock;
