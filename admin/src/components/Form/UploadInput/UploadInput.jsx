import { omit } from "lodash";
import { useController } from "react-hook-form";

import UncontrolledUploadInput from "./UncontrolledUploadInput";

const UploadInput = ({ name, control, rules, multiple, ...props }) => {
  if (!control || !control.register) {
    return (
      <UncontrolledUploadInput name={name} multiple={multiple} {...props} />
    );
  }

  const {
    field: { value = null, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <UncontrolledUploadInput
      value={value ?? null}
      error={errors[name]?.message}
      multiple={multiple}
      onChange={onChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default UploadInput;
