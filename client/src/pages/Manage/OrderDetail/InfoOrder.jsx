const InfoOrder = ({ detail }) => {
    return (
        <div className="flex justify-between">
            <div>
                <div className="text-lg font-semibold">Địa chỉ người nhận</div>
                <div>
                    <span>Địa chỉ: </span>
                    <span className="text-blue-500">{detail?.address}</span>
                </div>
                <div>
                    <span>Điện thoại: </span>
                    <span className="text-blue-500">{detail?.phone}</span>
                </div>
            </div>
            <div>
                <div className="text-lg font-semibold">Hình thức thanh toán</div>
                <div>
                    <p>
                        Thanh toán
                        {detail?.payment?.name === 'cash' ? ' khi nhận hàng' : ' bằng ' + detail?.payment?.name}
                    </p>
                    <span>Đơn hàng {`${detail?.payment?.paid ? 'đã được thanh toán' : 'chưa được thanh toán'}`}</span>
                </div>
            </div>
        </div>
    );
};

export default InfoOrder;
