import { omit } from "lodash";
import { useController } from "react-hook-form";
import UncontrolledTextarea from "./UncontrolledTextarea";

const Textarea = ({ name, control, rules, ...props }) => {
  if (!control || !control.register) {
    return <UncontrolledTextarea name={name} {...props} />;
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
    <UncontrolledTextarea
      value={value ?? null}
      error={errors[name]?.message}
      onChange={onChange}
      onBlur={onBlur}
      {...omit(props, ["value", "onChange", "onBlur"])}
    />
  );
};

export default Textarea;
