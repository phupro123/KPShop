import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, UploadInput } from "../../../components/Form";
import { Modal } from "../../../components/Modal";
import { userFormSchema } from "../../../components/Schemas/userFormSchema";
import { toast } from "react-toastify";

const DEFAULT_VALUE = {
  fullname: "",
  username: "",
  phone: "",
  password: "",
  image: "",
};

const UserModificationModal = ({
  isOpen,
  user,
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
    handleSubmit: useFormSubmit,
  } = useForm({
    resolver: yupResolver(userFormSchema()),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateUser = useCallback(
    async (formData) => {
      try {
        await onCreate(formData);
        toast.success("The user has been updated successfully.");
        onCreated();
        onClose();
      } catch (error) {
        toast.error("An unknown error occurred while processing your request.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [onClose, onCreate, onCreated, toast]
  );

  const handleUpdateUserById = useCallback(
    async (formData) => {
      if (!user) return;
      try {
        await onEdit(user._id, formData);
        toast.success("The user has been updated successfully.");
        onEdited();
        onClose();
      } catch (error) {
        toast.error("An unknown error occurred while processing your request.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [onClose, onEdit, onEdited, user, toast]
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!user) {
      handleCreateUser(formData);
      return;
    }

    handleUpdateUserById(formData);
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (user) {
      reset({
        ...user,
        password: "",
      });
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, user]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={user ? "Cập nhật người dùng" : "Thêm người dùng"}
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <Input
        label="Fullname"
        name="fullname"
        className="block"
        disabled={isSubmitting}
        control={control}
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting || !!user}
        label="Email"
        name="username"
        isRequired
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label="Phone"
        name="phone"
        isRequired
      />
      {!user && (
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label="Password"
          name="password"
          type="password"
          autoSave="off"
          isRequired
        />
      )}

      <UploadInput
        className="block"
        control={control}
        disabled={isSubmitting}
        multiple={false}
        label="Avatar"
        name="image"
      />
    </Modal>
  );
};

export default UserModificationModal;
