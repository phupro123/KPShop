import { omit } from "lodash";
import { forwardRef, useCallback } from "react";
import { useController } from "react-hook-form";

import UncontrolledInputDatePicker from "./UncontrolledInputDatePicker";

const InputDatePicker = ({ name, control, rules, ...props }, ref) => {
  if (!control || !control.register) {
    return <UncontrolledInputDatePicker name={name} ref={ref} {...props} />;
  }
  const {
    field: { value = [], onChange },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  const handleOnChange = useCallback(
    (rangeDate) => {
      onChange(rangeDate);
    },
    [onChange]
  );

  return (
    <UncontrolledInputDatePicker
      value={value ?? []}
      error={errors[name]?.message}
      onChange={handleOnChange}
      {...omit(props, ["value", "onChange"])}
    />
  );
};

export default forwardRef(InputDatePicker);
