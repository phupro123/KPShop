import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const UncontrolledToggle = ({
  isOn = false,
  size = "default",
  label,
  error,
  onChange,
  disable = false,
}) => {
  const [value, setValue] = useState(false);

  const handleChangeToggle = () => {
    if (disable) {
      return;
    }
    setValue(!value);
    onChange?.(!value);
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 70,
  };

  const divSizeClassName = {
    xs: "p-1 w-9",
    default: "p-1 w-10",
    xl: "p-1 w-14",
  };

  const motionSizeClassName = {
    xs: "w-2.5 h-2.5",
    default: "w-3 h-3",
    xl: "h-4 w-4",
  };

  useEffect(() => {
    if (isOn) {
      setValue(isOn);
    }
  }, [isOn]);

  return (
    <div>
      <div
        className="group flex items-center justify-start space-x-4"
        role="button"
        tabIndex={0}
        onClick={handleChangeToggle}
      >
        <div
          className={twMerge(
            "flex overflow-hidden rounded-full transition-colors",
            divSizeClassName[size],
            value ? "justify-end" : "justify-start",
            value
              ? "bg-primary-700 group-hover:bg-primary-800"
              : "bg-gray-100 group-hover:bg-gray-200",
            error && "ring-1 ring-red-500"
          )}
        >
          <motion.div
            className={twMerge(
              "rounded-full bg-white",
              motionSizeClassName[size]
            )}
            layout
            transition={spring}
          />
        </div>
        {label && <div>{label}</div>}
      </div>
      {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
    </div>
  );
};
export default UncontrolledToggle;
