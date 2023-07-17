import { useFormContext } from "react-hook-form";
import { Input, Select } from "../../../components/Form";
import {
  RAMEnum,
  ROMEnum,
  StorageEnum,
  featureCameraEnum,
  specialFeatureEnum,
} from "../../../Constants/Enums";
import Button from "../../../components/Button/Button";
import { useMemo } from "react";
import { values } from "lodash";

const ProductParams = ({ isSubmitting, onSubmit, onBackStep }) => {
  const { control, watch } = useFormContext();

  const category = watch("category");

  const RAMOptions = useMemo(
    () =>
      values(RAMEnum).map((ram) => ({
        value: ram.value,
        label: ram.value,
      })),
    []
  );

  const ROMOptions = useMemo(
    () =>
      values(ROMEnum).map((rom) => ({
        value: rom.value,
        label: rom.value,
      })),
    []
  );

  const StorageOptions = useMemo(
    () =>
      values(StorageEnum).map((storage) => ({
        value: storage.value,
        label: storage.value,
      })),
    []
  );

  const SpecialFeatureOptions = useMemo(
    () =>
      values(specialFeatureEnum).map((specialFeature) => ({
        value: specialFeature.value,
        label: specialFeature.value,
      })),
    []
  );

  const FeatureCameraOptions = useMemo(
    () =>
      values(featureCameraEnum).map((featureCamera) => ({
        value: featureCamera.value,
        label: featureCamera.value,
      })),
    []
  );

  return (
    <form className="grid grid-cols-1 gap-6" onSubmit={onSubmit}>
      {category === "Laptop" && (
        <div className="grid grid-cols-2 gap-6">
          <Input
            className="block"
            control={control}
            disabled={isSubmitting}
            label="CPU"
            name="parameter.CPU"
          />
          <Input
            className="block"
            control={control}
            disabled={isSubmitting}
            label="Bộ nhớ"
            name="parameter.storage"
          />
        </div>
      )}
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label="Màn hình"
        name="parameter.screen"
      />
      <Input
        className="block"
        control={control}
        disabled={isSubmitting}
        label="Hệ điều hành"
        name="parameter.operatingSystem"
      />
      {category === "Phone" && (
        <>
          <Select
            className="text-normal"
            control={control}
            isDisabled={isSubmitting}
            name="parameter.ROM"
            options={ROMOptions}
            placeholder="ROM"
          />
        </>
      )}
      <Select
        className="text-normal"
        control={control}
        isDisabled={isSubmitting}
        name="parameter.RAM"
        options={RAMOptions}
        placeholder="RAM"
      />
      {category !== "Laptop" && (
        <>
          <Input
            className="block"
            control={control}
            disabled={isSubmitting}
            label="Chip"
            name="parameter.chip"
          />
          <div className="grid grid-cols-2 gap-6">
            <Input
              className="block"
              control={control}
              disabled={isSubmitting}
              label="Sim"
              name="parameter.sim"
            />
            <Input
              className="block"
              control={control}
              disabled={isSubmitting}
              label="Pin, sạc"
              name="parameter.battery"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Input
              className="block"
              control={control}
              disabled={isSubmitting}
              label="Camera trước"
              name="parameter.frontCamera"
            />
            <Input
              className="block"
              control={control}
              disabled={isSubmitting}
              label="Camera sau"
              name="parameter.rearCamera"
            />
          </div>
          <Select
            className="text-normal"
            control={control}
            isDisabled={isSubmitting}
            name="parameter.featureCamera"
            options={FeatureCameraOptions}
            placeholder="Tính năng camera"
          />
        </>
      )}
      {category === "Tablet" && (
        <Select
          className="text-normal"
          control={control}
          isDisabled={isSubmitting}
          name="parameter.storage"
          options={StorageOptions}
          placeholder="Bộ nhớ"
        />
      )}
      {category !== "Phone" && (
        <Input
          className="block"
          control={control}
          disabled={isSubmitting}
          label="Cổng kết nối"
          name="parameter.connect"
        />
      )}
      <Select
        className="text-normal"
        control={control}
        isDisabled={isSubmitting}
        name="parameter.specialFeature"
        options={SpecialFeatureOptions}
        placeholder="Tính năng đặc biệt"
      />
      <div className="-mx-10 -mb-10 mt-4 flex items-center justify-end space-x-6 rounded-b-lg bg-gray-50 px-10 py-6">
        <Button
          className="flex-1 rounded-md border-2 border-gray-200 shadow-none ring-0"
          size="sm"
          color="light"
          disabled={isSubmitting}
          onClick={onBackStep}
        >
          Back
        </Button>
        <Button
          className="flex-1 rounded-md border-2 border-primary-700 px-12 shadow-none ring-0 disabled:border-gray-300"
          size="sm"
          disabled={isSubmitting}
          onClick={onSubmit}
        >
          Confirm
        </Button>
      </div>
    </form>
  );
};

export default ProductParams;
