import { ForwardedRef, forwardRef } from "react";

import UncontrolledInputSkeleton from "./UncontrolledInputSkeleton";

const UncontrolledInput = (
  {
    value,
    error,
    style,
    inlineError = false,
    isShowLabelWhenFocusing = false,
    isRequired,
    ...props
  },
  ref
) => {
  return (
    <div>
      <UncontrolledInputSkeleton
        {...(value === null || value === undefined || value === ""
          ? { value: "" }
          : { value })}
        error={error}
        style={style}
        inlineError={inlineError}
        isShowLabelWhenFocusing={isShowLabelWhenFocusing}
        isRequired={isRequired}
        isAvailableValue={Boolean(value)}
        ref={ref}
        {...props}
      />
    </div>
  );
};

export default forwardRef(UncontrolledInput);
