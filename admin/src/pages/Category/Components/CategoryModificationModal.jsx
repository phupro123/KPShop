import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/Form";
import { Modal } from "../../../components/Modal";
import { categoryFormSchema } from "../../../components/Schemas/categoryFormSchema";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/user/userSlice";
import { createAxios } from "../../../api/createInstance";

const DEFAULT_VALUE = {
  name: "",
};

const CategoryModificationModal = ({
  isOpen,
  category,
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
    resolver: yupResolver(categoryFormSchema()),
    defaultValues: DEFAULT_VALUE,
  });
  const currentUser = useSelector((state) => state.users?.current?.data);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, login);
  const handleCreateCategory = useCallback(
    async (formData) => {
      try {
        await onCreate(formData,axiosJWT);
        toast.success("The category has been updated successfully.");
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

  const handleUpdateCategoryById = useCallback(
    async (formData) => {
      if (!category) return;
      try {
        await onEdit(category._id, formData,axiosJWT);
        toast.success("The category has been updated successfully.");
        onEdited();
        onClose();
      } catch (error) {
        toast.error("An unknown error occurred while processing your request.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [methods.setError, onClose, onEdit, onEdited, category, toast]
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!category) {
      handleCreateCategory(formData);
      return;
    }

    handleUpdateCategoryById(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (category) {
      reset(category);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, category]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={category ? "Cập nhật loại sản phẩm" : "Thêm loại sản phẩm"}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label="Name"
        name="name"
      />
    </Modal>
  );
};

export default CategoryModificationModal;
