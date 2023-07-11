import { omit } from "lodash";
import { useCallback } from "react";
import { useController } from "react-hook-form";

import UncontrolledInputOTP from "./UncontrolledInputOTP";

const InputOTP = ({ name, quantity, control, rules, ...props }) => {
  if (!control || !control.register) {
    return <UncontrolledInputOTP name={name} quantity={quantity} {...props} />;
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
    (inputOTP) => {
      onChange(inputOTP);
    },
    [onChange]
  );

  return (
    <UncontrolledInputOTP
      quantity={quantity}
      value={value ?? null}
      error={errors[name]?.message}
      onChange={handleOnChange}
      {...omit(props, ["value", "onChange"])}
    />
  );
};

export default InputOTP;
