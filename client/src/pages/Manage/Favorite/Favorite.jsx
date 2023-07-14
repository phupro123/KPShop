import Section from '../../../components/Section/Section';
import Carousel from '../../../components/Carousel/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { BsHeartbreakFill } from 'react-icons/bs';
import { _getWishList } from '../../../redux/user/userApi';
import { useEffect } from 'react';
import { createAxios } from '../../../api/createInstance';
import { login } from '../../../redux/user/userSlice';

const Favorite = () => {
    const dispath= useDispatch()
    const user = useSelector((state) => state?.user?.currentUser);
    let axiosJWT = createAxios(user, dispath, login);

    useEffect(() => {
        const data = user
        _getWishList(data,dispath);
    }, []);
    return (
        <div className="flex flex-col space-y-4 text-base">
            <p className="text-2xl font-semibold mb-4">Danh sách yêu thích</p>
            <Section styles="border border-solid border-gray-300 px-4">
                {isEmpty(user.wishlist) ? (
                    <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500">
                        <BsHeartbreakFill size={40} className="text-gray-400" />
                        <div className="mt-2 text-gray-400">
                            Danh sách yêu thích trống. Vui lòng thêm sản phẩm vào danh sách để dễ dàng theo dỗi.
                        </div>
                    </div>
                ) : (
                    <Carousel data={user.wishlist} slidesPerView={4} />
                )}
            </Section>
        </div>
    );
};

export default Favorite;
