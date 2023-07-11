import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductItem from './ProductItem';
import { numberWithCommas } from '../../utils';
import { useCart } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { saveOrders } from '../../redux/order/ordersApi';
import { _editUser } from '../../redux/user/userApi';
import { BsChevronLeft } from 'react-icons/bs';
import { Input, Select } from '../../components/Form';
import { Button } from '../../components/Button';
import { addressFormSchema } from '../Manage/Address/addressFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { PATHS } from '../../components/LocationForm/paths';
import { values } from 'lodash';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { checkVoucher } from '../../services/product.service';

const DEFAULT_VALUE = {
    name: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    voucher: '',
};

const CartInfo = () => {
    const user = useSelector((state) => state?.user?.currentUser);

    const cartData = useCart();
    const { cartItems, totalPrice, totalQuantity } = cartData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cityOptions, setCityOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);
    const [discount, setDiscount] = useState(0);

    const {
        control,
        reset,
        watch,
        setValue,
        handleSubmit: useFormSubmit,
    } = useForm({
        resolver: yupResolver(addressFormSchema(false)),
        defaultValues: DEFAULT_VALUE,
    });

    const addressOptions = useMemo(
        () =>
            user?.address.map((item) => {
                return { value: item.mnemonicName, label: item.mnemonicName };
            }),
        [user],
    );

    const mnemonicName = watch('mnemonicName');

    const addressDefault = useMemo(
        () => user?.address?.find((item) => item?.mnemonicName === mnemonicName),
        [user?.address, mnemonicName],
    );

    const city = watch('city');
    const district = watch('district');
    const voucher = watch('voucher');

    const fetchCityData = useCallback(async () => {
        try {
            const { data } = await axios.get(PATHS.CITIES);
            setCityOptions(
                values(data.data).map((city) => ({
                    value: { id: city.id, name: city.name },
                    label: city.name,
                })),
            );
        } catch (error) {
            toast.error('Đã xảy ra vấn đề trong quá trình xử lý. Vui lòng thử lại sau.');
        }
    }, [toast]);

    const fetchDistrictData = useCallback(async () => {
        if (!city.id) {
            return;
        }
        try {
            const { data } = await axios.get(`${PATHS.DISTRICTS}/${city.id}.json`);
            setDistrictOptions(
                values(data.data).map((district) => ({
                    value: { id: district.id, name: district.name },
                    label: district.name,
                })),
            );
        } catch (error) {
            toast.error('Đã xảy ra vấn đề trong quá trình xử lý. Vui lòng thử lại sau.');
        }
    }, [toast, city]);

    const fetchWardData = useCallback(async () => {
        if (!district.id) {
            return;
        }
        try {
            const { data } = await axios.get(`${PATHS.WARDS}/${district.id}.json`);
            setWardOptions(
                values(data.data).map((ward) => ({
                    value: { id: ward.id, name: ward.name },
                    label: ward.name,
                })),
            );
        } catch (error) {
            toast.error('Đã xảy ra vấn đề trong quá trình xử lý. Vui lòng thử lại sau.');
        }
    }, [toast, district]);

    const handleSubmit = useFormSubmit(async (formData) => {
        setIsSubmitting(false);
        const dataPostOrder = {
            _id: Date.now(),
            customer_id: user?.userId,
            ...formData,
            receiver: '',
            payment: {
                name: '',
                paid: 'false',
            },
            discount: discount,
            totalPrice: totalPrice,
            totalQuantity: totalQuantity,
            status: 'Đang xử lý',
            order_items: cartItems,
            time: dayjs().format('HH:MM MM/DD/YYYY'),
        };

        try {
            await saveOrders(dispatch, dataPostOrder);
            navigate('/order');
        } catch {
            toast.error('Đã xảy ra vấn đề trong quá trình đặt hàng. Vui lòng thử lại sau.');
        }
    });

    useEffect(() => {
        fetchCityData();
        fetchDistrictData();
        fetchWardData();
    }, [fetchCityData, fetchDistrictData, fetchWardData]);

    useEffect(() => {
        if (addressDefault) {
            reset(addressDefault);
            return;
        }

        reset(DEFAULT_VALUE);
    }, [reset, addressDefault]);

    const handleVoucher = useCallback(async () => {
        if (!voucher) {
            return;
        }
        try {
            const response = await checkVoucher({
                name: voucher,
            });
            setDiscount(totalPrice * response.sale);
            toast.success('Mã giảm giá đã được áp dụng thành công');
        } catch (error) {
            toast.error(error.response.data.error);
            setValue('voucher', '');
        }
    }, [voucher, setValue, totalPrice, toast]);

    return (
        <div className="text-lg">
            <div className="flex justify-between">
                <p className="text-2xl font-semibold">Giỏ hàng</p>
                <Link to="/" className="text-blue-500 flex items-center text-sm">
                    <BsChevronLeft />
                    Mua thêm sản phẩm khác
                </Link>
            </div>
            <div className="flex space-x-10 mt-2">
                <div className="flex flex-col bg-white rounded-xl border p-6 shadow-xl space-y-6">
                    {cartItems.map((product) => (
                        <ProductItem key={product._id} product={product} />
                    ))}
                </div>
                <div className="w-[350px] flex flex-col space-y-4 text-base">
                    <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col space-y-4 border">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">Thông tin người nhận</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                            <Select
                                className="text-normal"
                                name="mnemonicName"
                                control={control}
                                disabled={isSubmitting}
                                options={addressOptions}
                                placeholder="Tên gợi nhớ"
                                isRequired={false}
                            />
                            <Input
                                className="block"
                                control={control}
                                disabled={isSubmitting}
                                label="Họ tên"
                                name="fullname"
                            />
                            <Input
                                className="block"
                                control={control}
                                disabled={isSubmitting}
                                label="Số điện thoại"
                                name="phone"
                            />
                            <Select
                                className="text-normal"
                                name="city"
                                control={control}
                                disabled={isSubmitting}
                                options={cityOptions}
                                placeholder="Tỉnh/Thành"
                            />
                            <Select
                                className="text-normal"
                                name="district"
                                control={control}
                                isDisabled={isSubmitting || !city}
                                options={districtOptions}
                                placeholder="Quận/Huyện"
                            />
                            <Select
                                className="text-normal"
                                name="ward"
                                control={control}
                                isDisabled={isSubmitting || !district}
                                options={wardOptions}
                                placeholder="Phường/Xã"
                            />
                            <Input
                                className="block"
                                control={control}
                                disabled={isSubmitting}
                                label="Địa chỉ"
                                name="address"
                            />
                        </form>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-xl flex flex-col space-y-4 border">
                        <div className="flex justify-between space-x-4">
                            <Input
                                className="block"
                                label="Mã giảm giá"
                                name="voucher"
                                control={control}
                                disabled={isSubmitting}
                            />

                            <Button size="xs" onClick={handleVoucher} className="w-1/2">
                                Xác nhận
                            </Button>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Tạm tính:</span>
                            <span className="font-bold text-primary-600">{numberWithCommas(totalPrice)}₫</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Giảm giá:</span>
                            <span className="font-bold text-primary-600">{numberWithCommas(discount)}₫</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Tổng tiền:</span>
                            <span className="font-bold text-primary-600">
                                {numberWithCommas(totalPrice - discount)}₫
                            </span>
                        </div>
                        <div>
                            <p className="text-green-600 float-right">Miễn phí giao hàng</p>
                        </div>
                        <Button onClick={handleSubmit} type="submit" className="w-full">
                            Đặt hàng
                        </Button>
                        <p className="text-justify text-sm">
                            Bạn có thể chọn hình thức thanh toán sau khi đặt hàng. Bằng cách đặt hàng, bạn đồng ý với
                            Điều khoản sử dụng của KPShop
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartInfo;
