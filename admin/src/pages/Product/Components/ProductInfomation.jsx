import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Select, UploadInput } from "../../../components/Form";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { BrandService, CategoryService } from "../../../services";
import { values } from "lodash";
import Textarea from "../../../components/Form/TextArea/TextArea";
import Button from "../../../components/Button/Button";

const ProductInformation = ({ product, onClose, onNextStep }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);

  const { control, watch } = useFormContext();

  const category = watch("category");

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
    fetchCategoryData();
    fetchBrandData();
  }, [fetchCategoryData, fetchBrandData]);

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={onNextStep}>
      <div className="grid grid-cols-2 gap-6">
        <Input
          className="block"
          control={control}
          label="Name"
          name="title"
          isRequired
        />
        <Input
          className="block"
          control={control}
          label="Price"
          name="price"
          isRequired
        />
      </div>
      <Textarea
        className="block"
        control={control}
        label="Info"
        name="info"
        isRequired
      />
      <div className="grid gap-6 grid-cols-2">
        <Select
          className="text-normal"
          control={control}
          name="category"
          options={categoryOptions}
          placeholder="Category"
        />
        <Select
          className="text-normal"
          control={control}
          isDisabled={!category}
          name="brand"
          options={brandOptions}
          placeholder="Brand"
        />
      </div>
      <UploadInput
        className="block"
        control={control}
        multiple={false}
        label="Image"
        name="img"
        isRequired={false}
      />
      <div className={twMerge("grid gap-6", product && "grid-cols-2")}>
        <Input
          className="block"
          control={control}
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
          label="Promotion"
          name="promotion"
          isRequired={false}
        />
        <Input
          className="block"
          control={control}
          label="Tag"
          name="tag"
          isRequired={false}
        />
      </div>
      <UploadInput
        name="gallery"
        control={control}
        multiple
        label="Gallery"
        placeholder="Choose Gallery"
      />
      <div className="-mx-10 -mb-10 mt-4 flex items-center justify-end space-x-6 rounded-b-lg bg-gray-50 px-10 py-6">
        <Button
          className="rounded-md border-2 border-gray-200 px-6 shadow-none ring-0"
          size="sm"
          color="light"
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          className="flex-1 rounded-md border-2 border-primary-700 px-12 shadow-none ring-0 disabled:border-gray-300"
          size="sm"
          onClick={onNextStep}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default ProductInformation;
