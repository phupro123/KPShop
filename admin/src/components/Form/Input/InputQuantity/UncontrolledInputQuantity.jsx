import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

import UncontrolledInputSkeleton from "../UncontrolledInputSkeleton";

const UncontrolledInputQuantity = (
  {
    value: valueProps,
    error,
    style,
    min,
    max,
    inlineError,
    isShowLabelWhenFocusing,
    isRequired,
    ...props
  },
  ref
) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(Number(valueProps));
  }, [valueProps]);

  const handleIncrease = useCallback(() => {
    if (value >= Number(max)) {
      return;
    }
    setValue((prev) => prev + 1);
  }, [max, value]);

  const handleDecrease = useCallback(() => {
    if (value <= Number(min)) {
      return;
    }
    setValue((prev) => prev - 1);
  }, [min, value]);

  return (
    <div className="group">
      <UncontrolledInputSkeleton
        value={value ?? 0}
        type="number"
        error={error}
        style={style}
        inlineError={inlineError}
        isShowLabelWhenFocusing={isShowLabelWhenFocusing}
        isRequired={isRequired}
        isAvailableValue={Boolean(value || value === 0)}
        ref={ref}
        {...props}
      >
        <div className="absolute inset-y-0 right-8 flex group-hover:z-20">
          <div className="my-3.5 border border-gray-300" />
          <div className="ml-2 flex flex-col justify-center text-base">
            <div role="button" tabIndex={0} onClick={handleIncrease}>
              <HiPlus size={20} className="text-gray-300 hover:text-blue-500" />
            </div>
            <div role="button" tabIndex={0} onClick={handleDecrease}>
              <HiMinus
                size={20}
                className="text-gray-300 hover:text-blue-500"
              />
            </div>
          </div>
        </div>
      </UncontrolledInputSkeleton>
    </div>
  );
};

export default forwardRef(UncontrolledInputQuantity);
