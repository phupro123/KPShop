import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Modal } from "../../../components/Modal";
import { productFormSchema } from "../../../components/Schemas/productFormSchema";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/user/userSlice";
import { createAxios } from "../../../api/createInstance";
import ProductParams from "./ProductParams";
import ProductInformation from "./ProductInfomation";

const DEFAULT_VALUE = {
  title: "",
  price: "",
  info: "",
  img: "",
  gallery: [],
  promotion: "",
  discount: "",
  tag: "",
  rating: "",
  category: "",
  brand: "",
  parameter: null,
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
  const [step, setStep] = useState(1);

  const currentUser = useSelector((state) => state.users?.current?.data);
  const dispatch = useDispatch();
  let axiosJWT = createAxios(currentUser, dispatch, login);
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

  const handleOnClose = useCallback(() => {
    onClose();
    setStep(1);
  }, [onClose]);

  const handleCreateProduct = useCallback(
    async (formData) => {
      try {
        await onCreate(formData, axiosJWT);
        toast.success("The product has been updated successfully.");
        onCreated();
        onClose();
      } catch (error) {
        toast.error("An unknown error occurred while processing your request.");
      } finally {
        setIsSubmitting(false);
        setStep(1);
      }
    },
    [methods.setError, onClose, onCreate, onCreated, toast]
  );

  const handleUpdateProductById = useCallback(
    async (formData) => {
      if (!product) return;
      try {
        await onEdit(product._id, formData, axiosJWT);
        toast.success("The product has been updated successfully.");
        onEdited();
        onClose();
      } catch (error) {
        toast.error("An unknown error occurred while processing your request.");
      } finally {
        setIsSubmitting(false);
        setStep(1);
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

  const handleNextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleBackStep = useCallback(() => {
    setStep((prev) => prev - 1);
  }, []);

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

  return (
    <Modal
      isLoading={isSubmitting}
      isOpen={isOpen}
      isFormModal
      title={product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
      contentContainerClassName="w-[500px]"
      onClose={handleOnClose}
      isShowFooter={false}
      {...props}
    >
      <FormProvider
        control={control}
        handleSubmit={useFormSubmit}
        setValue={setValue}
        watch={watch}
        reset={reset}
        {...methods}
      >
        {step === 1 ? (
          <ProductInformation
            product={product}
            onClose={handleOnClose}
            onNextStep={handleNextStep}
          />
        ) : (
          <ProductParams
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onBackStep={handleBackStep}
          />
        )}
      </FormProvider>
    </Modal>
  );
};

export default ProductModificationModal;
