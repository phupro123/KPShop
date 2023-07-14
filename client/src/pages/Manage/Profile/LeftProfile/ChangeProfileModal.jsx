import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { _editUser } from '../../../../redux/user/userApi';
import { Modal } from '../../../../components/Modal';
import { UploadInput } from '../../../../components/Form';
import { toast } from 'react-toastify';
import { createAxios } from "../../../../api/createInstance";
import { login } from "../../../../redux/user/userSlice";
const ChangeAvatarModal = ({ currentUser, isOpen, onClose, ...props }) => {
  
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, login);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, reset, handleSubmit: useFormSubmit } = useForm();

    const handleSubmit = useFormSubmit(async (formData) => {
        setIsSubmitting(true);
        try {
            await _editUser(dispatch, formData, currentUser?._id,axiosJWT);
            toast.success('Cập nhật ảnh đại diện thành công!');
        } catch {
            toast.error('Đã có lỗi xảy ra trong quá trình cập nhật');
        } finally {
            setIsSubmitting(false);
        }
    });

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setIsSubmitting(false);

        reset(currentUser);
    }, [isOpen, reset, currentUser]);

    return (
        <Modal
            isLoading={isSubmitting}
            isOpen={isOpen}
            isFormModal
            title="Cập nhật ảnh đại diện"
            onClose={onClose}
            onConfirm={handleSubmit}
            {...props}
        >
            <UploadInput
                name="image"
                control={control}
                disabled={isSubmitting}
                multiple={false}
                label="Hình đại diện"
                placeholder="Chọn hình đại diện"
            />
        </Modal>
    );
};

export default ChangeAvatarModal;
