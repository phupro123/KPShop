import { omit } from "lodash";
import { forwardRef } from "react";
import { useController } from "react-hook-form";

import UncontrolledInputQuantity from "./UncontrolledInputQuantity";

const InputQuantity = ({ name, control, rules, ...props }, ref) => {
  if (!control || !control.register) {
    return <UncontrolledInputQuantity name={name} ref={ref} {...props} />;
  }

  const {
    field: { value = 0, onChange, onBlur },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <UncontrolledInputQuantity
      value={value ?? 0}
      error={errors[name]?.message}
      onChange={onChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default forwardRef(InputQuantity);
