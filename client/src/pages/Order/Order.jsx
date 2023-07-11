import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { numberWithCommas } from '../../utils';
import { Navigate, useNavigate } from 'react-router-dom';
import { postOrders, _editOrder } from '../../redux/order/ordersApi';
import { clearCart } from '../../redux/shopping-cart/cartItemsSlide';
import { momo } from '../../services/payment';
import { toast } from 'react-toastify';
import { _succesOrder } from '../../redux/user/userApi';
const Order = ({}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.order.data);
    const currentUser = useSelector((state) => state.user?.currentUser);
    const notify = () => toast.success('Đặt hàng thành công!');
    const handleConfirm = async () => {
        const payment = getPayment();
        if(payment.name =="not"){
            toast.info("Vui lòng chọn hình thức thanh toán");
            return
        }
        const data = { ...order, payment };

        postOrders(dispatch, data);
        notify();
        dispatch(clearCart());
        if(currentUser?.username){
            await _succesOrder(data)
        }
        
        if (payment.name === 'momo') {
            let redirectUrl = window.location.origin + '/history';
            const dataMomo = {
                orderId: data._id,
                orderInfo: `${data.fullname} thanh toán đơn hàng ${data._id} với MoMo`,
                redirectUrl: redirectUrl,
                amount: 5000,
                extraData: '',
            };
            const res = await momo.createMomoPayment(dataMomo);
            localStorage.removeItem('order');

            // const temp = {
            //     id: data._id,
            //     payment: {
            //         name: 'momo',
            //         paid: true,
            //     },
            // };
            // await _editOrder(temp);

            window.location = res.payUrl;
        } else {
            navigate('/history');
        }
    };
    const getPayment = () => {
        const radios = document.querySelectorAll('input[name="payment"]');
        let paymentIndex = -1;
        for (let i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                paymentIndex = i;
                break;
            }
        }
        return paymentIndex != -1 ? { name: radios[paymentIndex].value, paid: false } : { name: 'not', paid: false };
    };

    
    useEffect(() => {
        document.title = "Xác nhận đơn hàng - KPShop.com";
    }, []);
    return (
        <>
            {order ? (
                <div className="order">
                    <div className="alertsuccess-new">
                        <i className="new-cartnew-success"></i>
                        <strong>Xác Nhận đơn đặt hàng</strong>
                    </div>
                    <div className="ordercontent">
                        <div>
                            <p>
                                Cảm ơn Anh/ Chị <b>{order.fullname}</b> đã cho KPShop cơ hội được phục vụ.
                            </p>
                        </div>
                        <div>
                            <div className="info-order">
                                <div className="info-order-header">
                                    <h4>
                                        {/* Đơn hàng: <span className="text-blue-400 font-bold">#{order._id}</span> */}
                                        
                                        Thông tin đơn hàng:
                                    </h4>
                                    <div className="header-right">
                                        {/* <Link to="/history">Quản lý đơn hàng</Link> */}
                                        <div className="cancel-order-new">
                                            {/* <div>
                                                <div className="cancel-order-new">
                                                    <span>.</span>
                                                    <a onClick={handleCancel} href="/">
                                                        Hủy
                                                    </a>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <label htmlFor="">
                                    <span>
                                        <i className="info-order__dot-icon"></i>
                                        <span>
                                            <strong>Người nhận hàng:</strong>
                                            <h4 id="userName">{order.fullname}</h4>
                                            <br />
                                            <strong>Số điện thoại:</strong>
                                            <h4 id="customerPhone">{order.phone}</h4>
                                        </span>
                                    </span>
                                </label>
                                <label htmlFor="">
                                    <span>
                                        <i className="info-order__dot-icon"></i>
                                        <span>
                                            <strong>Giao đến: </strong>
                                            {order.address}, {order.ward.name}, {order.district.name}, {order.city.name}{' '}
                                            (nhân viên sẽ gọi xác nhận trước khi giao).
                                        </span>
                                    </span>
                                </label>
                                <label htmlFor="">
                                    <span>
                                        <i className="info-order__dot-icon"></i>
                                        <span>
                                            <strong>Tổng tiền: {numberWithCommas(Number(order.totalPrice))} </strong>
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <h4 className="order-infor-alert">Đơn hàng chưa được thanh toán</h4>
                        </div>

                        <div className="payment-method-new">
                            <div>
                                <h3>Chọn hình thức thanh toán:</h3>
                                <ul className="formality-pay-new">
                                    <li className="normal-payment">
                                        <div className="text-payment">
                                            <span>
                                                <input type="radio" id="cash" name="payment" value="cash" />
                                                <label htmlFor="cash">Thanh toán tiền mặt khi nhận hàng</label>
                                            </span>
                                        </div>
                                    </li>

                                    {/* <li className="normal-payment">
                                        <div className="text-payment">
                                            <span>
                                                <input type="radio" id="ck" name="payment" value="banking" />
                                                <label htmlFor="ck">Chuyển khoản ngân hàng</label>
                                            </span>
                                        </div>
                                    </li> */}

                                    {/* <li className="normal-payment">
                                        <div className="text-payment">
                                            <span>
                                                <input type="radio" id="atm" name="payment" value="atm" />
                                                <label htmlFor="atm">Qua thẻ ATM (có Internet Banking)</label>
                                            </span>
                                        </div>
                                    </li> */}

                                    <li className="normal-payment">
                                        <div className="text-payment">
                                            <span>
                                                <input type="radio" id="momo" name="payment" value="momo" />
                                                <label htmlFor="momo">Ví MoMo</label>
                                            </span>
                                        </div>
                                    </li>
                                    {/* <li className="normal-payment">
                                        <div className="text-payment">
                                            <span>
                                                <input type="radio" id="vnpay" name="payment" value="vnpay" />
                                                <label htmlFor="vnpay">Thanh toán qua VNPay</label>
                                            </span>
                                        </div>
                                    </li> */}
                                </ul>

                                <button onClick={handleConfirm} className="confirm-payment-button">
                                    Xác nhận đơn hàng
                                </button>
                            </div>
                            <div className="refund-popup">
                                {/* <a href="">Xem chính sách hoàn tiền online</a> */}
                            </div>
                            <hr />

                            <div className="buyanotherNew">
                                <Link to="/"> Mua thêm sản phẩm khác </Link>
                            </div>
                            <span className="customer-rating">
                                <div className="customer-rating__top">
                                    <div className="customer-rating__top__desc">
                                        Anh/ Chị <strong>{order.fullname}</strong> có hài lòng về trải nghiệm mua hàng?
                                    </div>
                                    <div className="customer-rating__top__rating-buttons">
                                        <button className="customer-rating__top__rating-buttons__good">
                                            <p>Hài lòng</p>
                                            <i className="iconrating-good"></i>
                                        </button>
                                        <button className="customer-rating__top__rating-buttons__bad">
                                            <p>Không hài lòng</p>
                                            <i className="iconrating-bad"></i>
                                        </button>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/cart" />
            )}
        </>
    );
};

export default Order;
