import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { _editUser } from '../../../../redux/user/userApi';
import { Input } from '../../../../components/Form';
import { profileFormSchema } from './profileFormSchema';
import Button from '../../../../components/Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Avatar from '../../../../components/Avatar/Avatar';
import ChangeAvatarModal from './ChangeProfileModal';
import { BsCameraFill } from 'react-icons/bs';
import { login } from '../../../../redux/user/userSlice';
import { createAxios } from '../../../../api/createInstance';
import { useNavigate } from 'react-router-dom';

function LeftProfile(props) {
    let { currentUser } = props;
   
   
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isShowChangeProfileModal, setIsShowChangeProfileModal] = useState(false);

    const handleCloseShowModal = useCallback(() => {
        setIsShowChangeProfileModal(false);
    }, []);

    const handleShowChangeProfileModal = useCallback(() => {
        setIsShowChangeProfileModal(true);
    }, []);

    const {
        control,
        reset,
        handleSubmit: useFormSubmit,
    } = useForm({
        resolver: yupResolver(profileFormSchema()),
    });

    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, login);
    const navigate = useNavigate()
    const handleSubmit = useFormSubmit((formData) => {
        setIsSubmitting(true);

        _editUser(dispatch, formData, currentUser?._id,axiosJWT,navigate)
            .then(() => {
                
            })
            .catch(() => {
                toast.success('Đã có lỗi xảy ra trong quá trình cập nhật');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    });

    useEffect(() => {
        setIsSubmitting(false);

        if (currentUser) {
            reset(currentUser);
            return;
        }
    }, [reset]);

    return (
        <div className="flex justify-between space-x-8 text-base items-start">
            <button className="mt-10 flex-none relative" onClick={handleShowChangeProfileModal}>
                <Avatar src={currentUser?.image} alt={currentUser?.fullname} className="h-24 w-24" />
                <div className="absolute bottom-0 right-0">
                    <BsCameraFill size={24} className="mr-2 text-slate-800" />
                </div>
            </button>

            <div className="w-3/4 space-y-6">
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                    <Input
                        label="Họ và tên"
                        name="fullname"
                        className="block"
                        disabled={isSubmitting}
                        control={control}
                    />
                    <Input label="Tài khoản" name="username" className="block" disabled control={control} />
                    {/* <Input
                        label="Số điện thoại"
                        name="phone"
                        className="block"
                        disabled={isSubmitting}
                        control={control}
                    /> */}
                    <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                        Lưu thay đổi
                    </Button>
                </form>
            </div>

            {isShowChangeProfileModal && (
                <ChangeAvatarModal
                    currentUser={currentUser}
                    isOpen={isShowChangeProfileModal}
                    onClose={handleCloseShowModal}
                />
            )}
        </div>
    );
}

export default LeftProfile;
