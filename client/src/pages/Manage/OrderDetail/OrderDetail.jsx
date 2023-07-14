import { Link, useParams } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import { useEffect } from 'react';
import {  _getOrderDetail } from '../../../redux/order/ordersApi';
import { useDispatch, useSelector } from 'react-redux';
import InfoOrder from './InfoOrder';
import ProductOrder from './ProductOrder';

function OrderDetial({ title }) {
    const detail = useSelector((state) => state.order?.order?.data);
    const param = useParams('id');
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = title;
        _getOrderDetail(dispatch, param.id);
    }, []);

    return (
        <div className="">
            <div className="text-2xl font-semibold mb-4 space-x-4">Chi tiết đơn hàng</div>
            <div>
                Mã đơn hàng: {detail?._id} <span className="italic"> - {detail?.status}</span>
            </div>
            <InfoOrder detail={detail} />
            <ProductOrder detail={detail} />

            <Link to="/history">
                <div className="mt-2 text-blue-500 hover:text-blue-700 flex items-center">
                    <BsChevronLeft />
                    <span>Quay lại quản lý đơn hàng</span>
                </div>
            </Link>
        </div>
    );
}

export default OrderDetial;
