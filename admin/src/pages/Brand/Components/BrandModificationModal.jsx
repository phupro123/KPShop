import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select } from "../../../components/Form";
import { Modal } from "../../../components/Modal";
import { brandFormSchema } from "../../../components/Schemas/brandFormSchema";
import { toast } from "react-toastify";
import { CategoryService } from "../../../services";
import { values } from "lodash";

const DEFAULT_VALUE = {
  name: "",
  category: "",
};

const BrandModificationModal = ({
  isOpen,
  brand,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const {
    control,
    reset,
    setValue,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm({
    resolver: yupResolver(brandFormSchema()),
    defaultValues: DEFAULT_VALUE,
  });

  const handleCreateBrand = useCallback(
    async (formData) => {
      try {
        await onCreate(formData);
        toast.success("The brand has been updated successfully.");
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

  const handleUpdateBrandById = useCallback(
    async (formData) => {
      if (!brand) return;
      try {
        await onEdit(brand._id, formData);
        toast.success("The brand has been updated successfully.");
        onEdited();
        onClose();
      } catch (error) {
        toast.error("An unknown error occurred while processing your request.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [methods.setError, onClose, onEdit, onEdited, brand, toast]
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!brand) {
      handleCreateBrand(formData);
      return;
    }

    handleUpdateBrandById(formData);
  });

  const fetchCategoryData = useCallback(async () => {
    try {
      const { data } = await CategoryService.getCategories();

      setCategoryOptions(
        values(data).map((category) => ({
          value: category.name,
          label: category.name,
        }))
      );
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, [toast]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (brand) {
      reset(brand);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, brand]);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={brand ? "Cập nhật thương hiệu" : "Thêm thương hiệu"}
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
      <Select
        className="text-normal"
        control={control}
        isDisabled={isSubmitting}
        name="category"
        options={categoryOptions}
        placeholder="Category"
      />
    </Modal>
  );
};

export default BrandModificationModal;
