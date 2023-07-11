import { useState } from 'react';
import { CounterQuantity } from '../../../components/Quantity';
import { discountInfo, discountMore } from './DiscountContent';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsCheck } from 'react-icons/bs';
import { addItem } from '../../../redux/shopping-cart/cartItemsSlide';
import PayInfoSkeleton from './PayInfoSkeleton';
import { Button } from '../../../components/Button';
import { numberWithCommas } from '../../../utils';
import Star from '../../../components/Rating/Star';

const PayInfo = ({ isLoading, phoneData }) => {
    const [quantity, setQuantity] = useState(1);
    const notify = () => toast.success('Thêm hàng vào giỏ thành công!');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClickPay = () => {
        const product = { ...phoneData, quantity: quantity };
        dispatch(addItem(product));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setQuantity(1);
        notify();
        navigate('/cart');
    };

    if (isLoading) {
        return <PayInfoSkeleton />;
    }

    return (
        <div className="text-lg flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
                <p className="capitalize text-base">
                    Thương hiệu: <span className="text-blue-500">{phoneData?.brand}</span>
                </p>
                <h1 className="text-3xl font-semibold">{phoneData?.title}</h1>
                <div className="flex items-center space-x-4 text-xl">
                    <div className="text-[#ffa500] font-bold">{phoneData?.star.toFixed(1)}</div>
                    <Star star={phoneData?.star} />
                    <div className="text-base">{phoneData?.totalVote} đánh giá</div>
                </div>
            </div>
            <div className="flex items-center text-lg">
                <span className="block w-28">Giá:</span>
                <div className="space-x-4">
                    <span className="text-primary-600 font-semibold text-2xl">
                        {numberWithCommas(Math.round(phoneData?.price * (1 - parseFloat(phoneData?.discount))))}₫
                    </span>
                    {
                        phoneData?.discount == "0"
                        ?
                        (<></>)
                        :
                        (
                            <>
                        <i className="line-through text-gray-600">{numberWithCommas(phoneData?.price)}₫</i>

                        <span className="text-primary-600">(-{phoneData?.discount * 100}%)</span>
                            </>
                         
                        )
                      
                    }
                   
                </div>
            </div>
            <div className="flex items-center">
                <span className="block w-28">Số lượng:</span>
                <CounterQuantity
                    value={1}
                    size="lg"
                    onChange={(e) => {
                        setQuantity(e);
                    }}
                />
            </div>

            <Button className="" size="md" onClick={handleClickPay}>
                Chọn mua
            </Button>

            <div className="border border-gray-400">
                <div className="bg-gray-100 p-4 border-b border-gray-400 font-bold text-xl">Khuyến mãi</div>
                <ul className="p-4 text-base">
                    {discountInfo.map((item, index) => {
                        return (
                            <li key={index}>
                                <span className="bg-blue-500 rounded-full h-7 w-7 inline-block text-center text-white mr-4">
                                    {index + 1}
                                </span>
                                <span>{item}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="border border-gray-400">
                <div className="bg-gray-100 p-4 border-b border-gray-400 font-bold text-xl">4 ưu đãi thêm</div>
                <ul className="p-4 text-base">
                    {discountMore.map((item, index) => {
                        return (
                            <li key={index}>
                                <span className="bg-blue-500 rounded-full h-7 w-7 inline-block text-center text-white mr-4 font-bold">
                                    <BsCheck className="inline" size={26} />
                                </span>
                                <span>{item}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default PayInfo;
