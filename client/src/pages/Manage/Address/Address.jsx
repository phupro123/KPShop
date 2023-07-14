import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback, useMemo, useState } from 'react';

import { ConfirmationModal } from '../../../components/Modal';
import { toast } from 'react-toastify';
import AddressModificationModal from './AddressModificationModal';
import { _editAddress, _popAddress, _pushAddress } from '../../../redux/user/userApi';
import { useDispatch, useSelector } from 'react-redux';
import AddressItem from './AddressItem';
import { login } from '../../../redux/user/userSlice';
import { createAxios } from '../../../api/createInstance';

const Address = () => {
    const dispatch = useDispatch();
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isShowModificationModal, setIsShowModificationModal] = useState(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const user = useSelector((state) => state?.user?.currentUser);
    let axiosJWT = createAxios(user, dispatch, login);
    const selectedAddress = useMemo(() => {
        return user?.address?.find((addressItem) => addressItem?.mnemonicName === selectedAddressId) ?? null;
    }, [selectedAddressId, user]);

    const handleClickAdd = useCallback(() => {
        setIsShowModificationModal(true);
    }, []);

    const handleClickEdit = useCallback((addressItem) => {
        setSelectedAddressId(addressItem.mnemonicName ?? null);
        setIsShowModificationModal(true);
    }, []);

    const handleClickDelete = useCallback((addressItem) => {
        setSelectedAddressId(addressItem.mnemonicName ?? null);
        setIsShowDeleteModal(true);
    }, []);

    const handleDelete = useCallback(async () => {
        if (!selectedAddress) {
            return;
        }

        try {
            await _popAddress(dispatch, selectedAddress, user._id,axiosJWT);

            toast.success('The address has been deleted successfully.');
        } catch (error) {
            toast.error('An error occurred while deleting the address. Please try again later.');
        } finally {
            setIsShowDeleteModal(false);
        }
    }, [selectedAddress, toast, dispatch, user]);

    const handleCloseModal = useCallback(() => {
        setIsShowModificationModal(false);
        setIsShowDeleteModal(false);
        setSelectedAddressId(null);
    }, []);

    return (
        <div className="flex flex-col space-y-4 text-base">
            <p className="text-2xl font-semibold mb-4">Số địa chỉ</p>
            <div
                onClick={handleClickAdd}
                className="flex justify-center items-center border-2 border-dashed py-6 rounded-xl text-blue-500 hover:text-blue-700 cursor-pointer"
            >
                <AiOutlinePlus size={20} />
                <span>Thêm địa chỉ mới</span>
            </div>
            {user?.address.map((addressItem, index) => (
                <AddressItem
                    key={index}
                    index={index}
                    addressItem={addressItem}
                    onClickEdit={handleClickEdit}
                    onClickDelete={handleClickDelete}
                />
            ))}
            <ConfirmationModal
                message="Bạn có chắc chắn muốn xóa địa chỉ này không? Thao tác này không thể hoàn tác."
                isOpen={isShowDeleteModal}
                status="danger"
                title="Xóa địa chỉ nhận hàng"
                onClose={handleCloseModal}
                onConfirm={handleDelete}
            />
            <AddressModificationModal
                isOpen={isShowModificationModal}
                selectedAddress={selectedAddress}
                onCreate={_pushAddress}
                onEdit={_editAddress}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default Address;
