import { omit } from "lodash";
import { forwardRef } from "react";
import { useController } from "react-hook-form";

import UncontrolledInput from "./UncontrolledInput";

const Input = ({ name, control, rules, ...props }, ref) => {
  if (!control || !control.register) {
    return <UncontrolledInput name={name} ref={ref} {...props} />;
  }

  const {
    field: { value = "", onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <UncontrolledInput
      value={value ?? null}
      error={errors[name]?.message}
      onChange={onChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default forwardRef(Input);
