import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select } from "../../../components/Form";
import { Modal } from "../../../components/Modal";
import { toast } from "react-toastify";
import { values } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/user/userSlice";
import { createAxios } from "../../../api/createInstance";

const status = [
  "Đang xử lý",
  "Chờ thanh toán",
  "Đang vận chuyển",
  "Đã giao",
  "Đã hủy",
];

const OrderModificationModal = ({
  isOpen,
  order,
  onClose,
  onEdit,
  onEdited,
  ...props
}) => {
  const currentUser = useSelector((state) => state.users?.current?.data);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, login);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusOptions, setStatusOptions] = useState([]);

  const { control, reset, handleSubmit: useFormSubmit } = useForm();

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    try {
      await onEdit(axiosJWT, { _id: formData._id, status: formData.status });
      toast.success("The status has been updated successfully.");
      onEdited();
      onClose();
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    reset(order);
  }, [isOpen, reset, order]);

  console.log(order);

  useEffect(() => {
    setStatusOptions(
      values(status).map((group) => ({
        value: group,
        label: group,
      }))
    );
  }, []);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={"Cập nhật trạng thái đơn hàng"}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input
        className="block"
        control={control}
        disabled
        label="ID"
        name="_id"
      />
      <Select
        className="text-normal"
        control={control}
        isDisabled={isSubmitting}
        name="status"
        options={statusOptions}
        placeholder="Trạng thái"
      />
    </Modal>
  );
};

export default OrderModificationModal;
