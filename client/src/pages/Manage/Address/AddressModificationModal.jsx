import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox, Input, Select } from '../../../components/Form';
import { Modal } from '../../../components/Modal';
import { addressFormSchema } from './addressFormSchema';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PATHS } from '../../../components/LocationForm/paths';
import { values } from 'lodash';

const DEFAULT_VALUE = {
    fullname: '',
    phone: '',
    city: '',
    district: '',
    ward: '',
    address: '',
    mnemonicName: '',
};

const AddressModificationModal = ({ isOpen, selectedAddress, onClose, onCreate, onEdit, ...props }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cityOptions, setCityOptions] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [wardOptions, setWardOptions] = useState([]);

    const {
        control,
        reset,
        watch,
        setValue,
        handleSubmit: useFormSubmit,
        ...methods
    } = useForm({
        resolver: yupResolver(addressFormSchema()),
        defaultValues: DEFAULT_VALUE,
    });

    const user = useSelector((state) => state?.user?.currentUser);
    const dispatch = useDispatch();

    const city = watch('city');
    const district = watch('district');
    const ward = watch('ward');

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

    const handleCreateaddress = useCallback(
        async (formData) => {
            try {
                await onCreate(dispatch, formData, user._id);
                toast.success('Thêm địa chỉ mới thành công.');

                onClose();
            } catch (error) {
                toast.error('Đã xảy ra vấn đề trong quá trình xử lý. Vui lòng thử lại sau.');
            } finally {
                setIsSubmitting(false);
            }
        },
        [methods.setError, onClose, onCreate, toast, dispatch, user],
    );

    const handleUpdateaddressById = useCallback(
        async (formData) => {
            if (!selectedAddress) return;

            const data = {
                oldAddress: selectedAddress,
                newAddress: formData,
            };
            try {
                await onEdit(dispatch, data, user._id);
                toast.success('Cập nhật địa chỉ thành công');

                onClose();
            } catch (error) {
                toast.error('Đã xảy ra vấn đề trong quá trình xử lý. Vui lòng thử lại sau.');
            } finally {
                setIsSubmitting(false);
            }
        },
        [methods.setError, onClose, onEdit, selectedAddress, toast, user, dispatch],
    );

    const handleSubmit = useFormSubmit(async (formData) => {
        setIsSubmitting(true);

        if (!selectedAddress) {
            handleCreateaddress(formData);
            return;
        }

        handleUpdateaddressById(formData);
    });

    useEffect(() => {
        fetchCityData();
        fetchDistrictData();
        fetchWardData();
    }, [fetchCityData, fetchDistrictData, fetchWardData]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setIsSubmitting(false);

        if (selectedAddress) {
            reset(selectedAddress);
            return;
        }

        reset(DEFAULT_VALUE);
    }, [isOpen, reset, selectedAddress]);

    return (
        <Modal
            isLoading={isSubmitting}
            isOpen={isOpen}
            isFormModal
            title={selectedAddress ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ mới'}
            onClose={onClose}
            onConfirm={handleSubmit}
            isAllowSubmit={!!ward.id}
            {...props}
        >
            <Input
                className="block"
                control={control}
                disabled={isSubmitting}
                label="Họ tên"
                name="fullname"
                isRequired
            />
            <div className="grid grid-cols-2 gap-6">
                <Input
                    className="block"
                    control={control}
                    disabled={isSubmitting}
                    label="Tên gợi nhớ"
                    name="mnemonicName"
                    isRequired
                />
                <Input
                    className="block"
                    control={control}
                    disabled={isSubmitting}
                    label="Số điện thoại"
                    name="phone"
                    isRequired
                />
            </div>
            <Select
                className="text-normal"
                name="city"
                control={control}
                disabled={isSubmitting}
                options={cityOptions}
                placeholder="Tỉnh/Thành"
                isRequired
            />
            <Select
                className="text-normal"
                name="district"
                control={control}
                isDisabled={isSubmitting || !city}
                options={districtOptions}
                placeholder="Quận/Huyện"
                isRequired
            />
            <Select
                className="text-normal"
                name="ward"
                control={control}
                isDisabled={isSubmitting || !district}
                options={wardOptions}
                placeholder="Phường/Xã"
                isRequired
            />
            <Input
                className="block"
                control={control}
                disabled={isSubmitting}
                label="Địa chỉ"
                name="address"
                isRequired
            />
            <label htmlFor="isDefault" className="group flex items-center justify-start space-x-4">
                <Checkbox name="isDefault" className="flex-shrink-0" disabled={isSubmitting} control={control} />
                <div className="text-sm font-semibold leading-6 text-gray-500">Đặt làm địa chỉ mặc định</div>
            </label>
        </Modal>
    );
};

export default AddressModificationModal;
