import _, { get } from "lodash";
import { useMemo } from "react";
import { useController } from "react-hook-form";

import UncontrolledSelect from "./UncontrolledSelect";

const Select = ({ control, name, ...props }) => {
  if (!control || !control.register) {
    return <UncontrolledSelect name={name} {...props} />;
  }

  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  const handleChange = (inputValue) => {
    onChange(get(inputValue, "value", ""));
  };

  const valueConvert = useMemo(() => {
    if (props.convert || !_.isEmpty(value)) {
      return value;
    }
    return null;
  }, [props.convert, value]);

  return (
    <UncontrolledSelect
      name={name}
      error={errors[name]?.message}
      value={valueConvert}
      onChange={handleChange}
      {...props}
    />
  );
};
export default Select;
