import { omit } from "lodash";
import { forwardRef, useCallback } from "react";
import { useController } from "react-hook-form";
import UncontrolledInputDate from "./UncontrolledInputDate";

const InputDate = ({ name, control, rules, ...props }, ref) => {
  if (!control || !control.register) {
    return <UncontrolledInputDate name={name} ref={ref} {...props} />;
  }
  const {
    field: { value = "", onChange },
    formState: { errors },
  } = useController({
    name,
    control,
    rules,
  });

  const handleOnChange = useCallback(
    (date) => {
      onChange(date);
    },
    [onChange]
  );

  return (
    <UncontrolledInputDate
      value={value ?? ""}
      error={errors[name]?.message}
      onChange={handleOnChange}
      {...omit(props, ["value", "onChange"])}
    />
  );
};

export default forwardRef(InputDate);
