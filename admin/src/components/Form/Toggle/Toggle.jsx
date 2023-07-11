import { useController } from "react-hook-form";

import UncontrolledToggle from "./UncontrolledToggle";

const Toggle = ({ control, name = "", ...props }) => {
  if (!control || !control.register) {
    return <UncontrolledToggle {...props} />;
  }

  const {
    field: { value = false, onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledToggle
      isOn={value}
      error={errors[name]?.message}
      onChange={onChange}
      {...props}
    />
  );
};
export default Toggle;
