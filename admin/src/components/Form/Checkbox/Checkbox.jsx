import { useController } from "react-hook-form";

import UncontrolledCheckbox from "./UncontrolledCheckbox";

const Checkbox = ({ control, name, ...props }) => {
  if (!control || !control.register) {
    return <UncontrolledCheckbox name={name} {...props} />;
  }

  const {
    field: { value, onChange },
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <UncontrolledCheckbox
      name={name}
      checked={value}
      error={errors[name]?.message}
      onChange={(event) => onChange(event.target.checked)}
      {...props}
    />
  );
};

export default Checkbox;
