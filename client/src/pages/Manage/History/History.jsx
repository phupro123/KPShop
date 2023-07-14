import { useCallback, useEffect, useState } from 'react';
import { _editOrder, _getAllOrders } from '../../../redux/order/ordersApi';
import { useDispatch, useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import ItemOrder from './ItemOrder';
import { Link } from 'react-router-dom';
import { login } from '../../../redux/user/userSlice';
import { createAxios } from '../../../api/createInstance';

function History({ title }) {
    const statusOrder = ['Tất cả đơn', 'Đang xử lý', 'Chờ thanh toán', 'Đang vận chuyển', 'Đã giao', 'Đã hủy'];

    const currentUser = useSelector((state) => state.user?.currentUser);
    const [status, setStatus] = useState('Tất cả đơn');

    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, login);
    useEffect(() => {
        _getAllOrders(dispatch, currentUser?.userId,axiosJWT,currentUser?._id);
        document.title = title;
    }, []);

    const origin = useSelector((state) => state.order?.all.data);
    const allOrder = origin?.map((item) => item).reverse();

    const handleCancel = async (e) => {
        const data = {
            id: e.target.id,
            status: 'Đã hủy',
        };
        await _editOrder(data,axiosJWT,currentUser?._id);
        window.location.reload(false);
    };

    const handleToggleStatus = useCallback(
        (title) => {
            setStatus(title);
        },
        [setStatus],
    );

    return (
        <div className="flex flex-col space-y-4">
            <p className="text-2xl font-semibold">Lịch sử đơn hàng</p>
            <div className="flex justify-between items-center">
                {statusOrder?.map((titleStatus, index) => {
                    return (
                        <button
                            key={index}
                            className={twMerge(
                                status === titleStatus && 'bg-blue-500 text-white',
                                'px-5 py-2 border rounded-xl shadow-xl',
                            )}
                            onClick={() => handleToggleStatus(titleStatus)}
                        >
                            {titleStatus}
                        </button>
                    );
                })}
            </div>
            <div>
                {allOrder
                    ?.filter((allItem) => (status === 'Tất cả đơn' ? allItem : allItem.status === status))
                    ?.map((allItem) => {
                        return (
                            <div key={allItem._id} className="bg-white rounded-xl border shadow-xl p-6 mb-6">
                                <div className="flex mb-2 justify-between font-semibold">
                                    <div>
                                        <span>Trạng thái: </span>
                                        <span className="text-blue-500">{allItem.status}</span>
                                    </div>
                                    {(allItem.status === 'Đang xử lý' || allItem.status === 'Chờ thanh toán') && (
                                        <h3 className="text-left">
                                            <button
                                                className="text-primary-500 hover:text-primary-700"
                                                id={allItem._id}
                                                onClick={handleCancel}
                                            >
                                                Hủy đơn
                                            </button>
                                        </h3>
                                    )}
                                </div>
                                <div className="font-semibold">
                                    <span>Mã đơn hàng: </span>
                                    <span className="text-blue-500">{allItem._id}</span>
                                </div>
                                <ItemOrder data={allItem} />
                                <div className="text-right mt-2">
                                    <Link to={`/order/${allItem._id}`} className="rounded-lg  text-[#0b74e5]">
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default History;
