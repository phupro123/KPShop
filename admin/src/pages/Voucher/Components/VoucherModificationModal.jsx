import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/Form";
import { Modal } from "../../../components/Modal";
import { voucherFormSchema } from "../../../components/Schemas/voucherFormSchema";
import { toast } from "react-toastify";
import InputDate from "../../../components/Form/Input/InputDate/InputDate";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../api/createInstance";
import { login } from "../../../redux/user/userSlice";

const DEFAULT_VALUE = {
  title: "",
  name: "",
  sale: "",
  quantity: "",
  condition: "",
  expiredDate: "",
  redeemUse: "",
};

const VoucherModificationModal = ({
  isOpen,
  voucher,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    reset,
    setValue,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm({
    resolver: yupResolver(voucherFormSchema()),
    defaultValues: DEFAULT_VALUE,
  });
  const currentUser = useSelector((state) => state.users?.current?.data);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, login);
  const handleCreateVoucher = useCallback(
    async (formData) => {
      try {
        await onCreate({
          ...formData,
          sale: (Number(formData.sale) / 100).toFixed(2),
        },axiosJWT);
        toast.success("The voucher has been updated successfully.");
        onCreated();
        onClose();
      } catch (error) {
        toast.error("An unknown error occurred while processing your request.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [methods.setError, onClose, onCreate, onCreated, toast]
  );

  const handleUpdateVoucherById = useCallback(
    async (formData) => {
      if (!voucher) return;
      try {
        await onEdit(voucher._id, {
          ...formData,
          sale: (Number(formData.sale) / 100).toFixed(2),
        },axiosJWT);
        toast.success("The voucher has been updated successfully.");
        onEdited();
        onClose();
      } catch (error) {
        toast.error("An unknown error occurred while processing your request.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [methods.setError, onClose, onEdit, onEdited, voucher, toast]
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!voucher) {
      handleCreateVoucher(formData);
      return;
    }

    handleUpdateVoucherById(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (voucher) {
      reset(voucher);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, voucher]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={voucher ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá"}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label="Title"
        name="title"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label="Name"
        name="name"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label="Sale"
        name="sale"
        isRequired
      />
      <div className="grid grid-cols-2 gap-6">
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label="Quantity"
          name="quantity"
          isRequired
        />
        <InputDate
          className="block"
          control={control}
          disabled={isSubmitting}
          label="Expired"
          name="expiredDate"
        />
      </div>
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label="Condition"
        name="condition"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label="Redeem Use"
        name="redeemUse"
        isRequired
      />
    </Modal>
  );
};

export default VoucherModificationModal;
