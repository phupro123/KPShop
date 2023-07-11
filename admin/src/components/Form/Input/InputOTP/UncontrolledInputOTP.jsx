import PinInput from "react-pin-input";

const UncontrolledInputOTP = ({
  quantity = 6,
  value,
  error,
  size = "normal",
  inlineError = false,
  onChange,
}) => {
  const handleOnChangeOTP = (inputOTP) => {
    onChange?.(inputOTP);
  };

  const sizeClassNames = {
    block: "",
  };

  switch (size) {
    case "xs":
      sizeClassNames.block = "h-8 !w-8 text-xs";
      break;
    case "sm":
      sizeClassNames.block = "h-10 !w-10 text-md";
      break;
    default:
      sizeClassNames.block = "h-13 !w-13 text-xl";
  }

  return (
    <div className="block cursor-text bg-white ring-inset transition-colors duration-100">
      <PinInput
        length={quantity}
        initialValue={String(value)}
        onChange={handleOnChangeOTP}
        type="numeric"
        inputMode="number"
        style={{ display: "flex", justifyContent: "space-between" }}
        inputStyle={{
          borderRadius: "8px",
          borderWidth: "2px",
          borderColor: error ? "#EF4444" : "#f3f4f6",
          marginInline: "0px",
        }}
        inputFocusStyle={{ borderColor: "#3b82f6" }}
        autoSelect
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      {!inlineError && Boolean(error) && (
        <div className="-mb-1.5 mt-1.5 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};

export default UncontrolledInputOTP;
