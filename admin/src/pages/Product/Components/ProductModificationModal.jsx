import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Select, UploadInput } from "../../../components/Form";
import { Modal } from "../../../components/Modal";
import { productFormSchema } from "../../../components/Schemas/productFormSchema";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { BrandService, CategoryService } from "../../../services";
import { values } from "lodash";
import { RAMEnum } from "../../../Constants/Enums";
import Textarea from "../../../components/Form/TextArea/TextArea";

const DEFAULT_VALUE = {
  title: "",
  price: "",
  info: "",
  img: "",
  promotion: "",
  discount: "",
  tag: "",
  rating: "",
  category: "",
  brand: "",
};

const ProductModificationModal = ({
  isOpen,
  product,
  onClose,
  onCreate,
  onCreated,
  onEdit,
  onEdited,
  ...props
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  const {
    control,
    reset,
    watch,
    setValue,
    handleSubmit: useFormSubmit,
    ...methods
  } = useForm({
    resolver: yupResolver(productFormSchema()),
    defaultValues: DEFAULT_VALUE,
  });

  const category = watch("category");

  const handleCreateProduct = useCallback(
    async (formData) => {
      try {
        await onCreate(formData);
        toast.success("The product has been updated successfully.");
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

  const handleUpdateProductById = useCallback(
    async (formData) => {
      if (!product) return;
      try {
        await onEdit(product._id, formData);
        toast.success("The product has been updated successfully.");
        onEdited();
        onClose();
      } catch (error) {
        toast.error("An unknown error occurred while processing your request.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [methods.setError, onClose, onEdit, onEdited, product, toast]
  );

  const handleSubmit = useFormSubmit(async (formData) => {
    setIsSubmitting(true);

    if (!product) {
      handleCreateProduct(formData);
      return;
    }

    handleUpdateProductById(formData);
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

  const fetchBrandData = useCallback(async () => {
    try {
      const data = await BrandService.getBrandsByCategory(category);

      setBrandOptions(
        values(data).map((brand) => ({
          value: brand.name,
          label: brand.name,
        }))
      );
    } catch (error) {
      toast.error("An unknown error occurred while processing your request.");
    }
  }, [toast, category]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsSubmitting(false);

    if (product) {
      reset(product);
      return;
    }

    reset(DEFAULT_VALUE);
  }, [isOpen, reset, product]);

  useEffect(() => {
    fetchCategoryData();
    fetchBrandData();
  }, [fetchCategoryData, fetchBrandData]);

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      contentContainerClassName="w-[500px]"
      onClose={onClose}
      onConfirm={handleSubmit}
      {...props}
    >
      <div className="grid grid-cols-2 gap-6">
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label="Name"
          name="title"
          isRequired
        />
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label="Price"
          name="price"
          isRequired
        />
      </div>
      <Textarea
        className="block"
        control={control}
        disabled={isSubmitting}
        label="Info"
        name="info"
        isRequired
      />
      <div className="grid gap-6 grid-cols-2">
        <Select
          className="text-normal"
          control={control}
          isDisabled={isSubmitting}
          name="category"
          options={categoryOptions}
          placeholder="Category"
        />
        <Select
          className="text-normal"
          control={control}
          isDisabled={isSubmitting || !category}
          name="brand"
          options={brandOptions}
          placeholder="Brand"
        />
      </div>
      <UploadInput
        className="block"
        control={control}
        disabled={isSubmitting}
        multiple={false}
        label="Image"
        name="img"
        isRequired={false}
      />
      <div className={twMerge("grid gap-6", product && "grid-cols-2")}>
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label="Discount"
          name="discount"
        />
        {product && (
          <Input
            className="block"
            control={control}
            disabled
            label="Rating"
            name="star"
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label="Promotion"
          name="promotion"
          isRequired={false}
        />
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label="Tag"
          name="tag"
          isRequired={false}
        />
      </div>
      <Select
        className="text-normal"
        control={control}
        isDisabled={isSubmitting}
        name="RAM"
        options={RAMEnum}
        placeholder="RAM"
      />
      <UploadInput
        name="gallery"
        control={control}
        disabled={isSubmitting}
        multiple
        label="Gallery"
        placeholder="Choose Gallery"
      />
    </Modal>
  );
};

export default ProductModificationModal;
