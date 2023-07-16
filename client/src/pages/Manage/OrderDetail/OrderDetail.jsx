import { Link, useParams } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import { useEffect } from 'react';
import {  _getOrderDetail } from '../../../redux/order/ordersApi';
import { useDispatch, useSelector } from 'react-redux';
import InfoOrder from './InfoOrder';
import ProductOrder from './ProductOrder';
import { login } from '../../../redux/user/userSlice';
import { createAxios } from '../../../api/createInstance';
import { momo } from '../../../services/payment';

function OrderDetial({ title }) {
    const detail = useSelector((state) => state.order?.detail?.data);
    const param = useParams('id');
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user?.currentUser);

    let axiosJWT = createAxios(currentUser, dispatch, login);
    
    const handleMomo = async () => {
            let redirectUrl = window.location.origin + '/history';
            const dataMomo = {
                orderId: detail._id,
                orderInfo: `${detail.fullname} thanh toán đơn hàng ${detail._id} với MoMo`,
                redirectUrl: redirectUrl,
                amount: detail.totalPrice,
                extraData: '',
            }
          
            const res = await momo.createMomoPayment(dataMomo);
            
            window.location = res.payUrl;
       
    };
    useEffect(() => {
        document.title = title;
        _getOrderDetail(dispatch,axiosJWT, param.id,currentUser?._id);
    }, []);

    return (
        <div className="">
            <div className="text-2xl font-semibold mb-4 space-x-4">Chi tiết đơn hàng</div>
            <div>
                Mã đơn hàng: {detail?._id} <span className="italic"> - {detail?.status}</span>
            </div>
            <InfoOrder detail={detail} />
            <ProductOrder detail={detail} />

            <div className="flex justify-between">
                <Link to="/history">
                    <div className="mt-2 text-blue-500 hover:text-blue-700 flex items-center">
                        <BsChevronLeft />
                        <span>Quay lại quản lý đơn hàng</span>
                    </div>
                </Link>
                {
                    detail?.payment?.name == "momo" && !detail?.payment?.paid ?
                    <div className="mt-2 text-bold  text-blue-500 hover:text-blue-700 flex items-center cursor-pointer" onClick={handleMomo}>
                                            
                                            <span>Thanh toán đơn hàng</span>
                                        </div>
                                        :<></>
                }
                
            </div>
            
        </div>
    );
}

export default OrderDetial;
