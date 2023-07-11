import { useCallback } from 'react';
import { _editAddress, _popAddress, _pushAddress } from '../../../redux/user/userApi';
import { twMerge } from 'tailwind-merge';

const AddressItem = ({ addressItem, onClickEdit, onClickDelete, index }) => {
    const handleClickEdit = useCallback(() => {
        onClickEdit?.(addressItem);
    }, [addressItem, onClickEdit]);

    const handleClickDelete = useCallback(() => {
        onClickDelete?.(addressItem);
    }, [addressItem, onClickDelete]);

    return (
        <div className={twMerge('flex justify-between border-2 p-6 rounded-lg', index == '0' && 'border-blue-500')}>
            <div className="flex flex-col space-y-4">
                <div className="flex space-x-4 items-center">
                    <span className="font-bold uppercase text-blue-500">{addressItem.fullname}</span>
                    {index == '0' && (
                        <span className="border border-green-500 text-green-500 rounded-xl p-2 text-xs">
                            Địa chỉ mặc định
                        </span>
                    )}
                </div>
                <div>
                    Điện thoại: <span className="font-semibold">{addressItem.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span>Địa chỉ:</span>
                    <div className="font-semibold line-clamp-1 break-all">
                        <span>{addressItem.address}, </span>
                        <span>{addressItem.ward?.name}, </span>
                        <span>{addressItem.district?.name}, </span>
                        <span>{addressItem.city?.name}</span>
                    </div>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="text-blue-500 hover:text-blue-700 cursor-pointer" onClick={handleClickEdit}>
                    Chỉnh sửa
                </div>
                <div className="text-red-500 hover:text-red-700 cursor-pointer" onClick={handleClickDelete}>
                    Xóa
                </div>
            </div>
        </div>
    );
};

export default AddressItem;
