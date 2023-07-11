import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import DatePickerDropdown from "../../../DatePicker/DatePickerDropdown";
import UncontrolledInputSkeleton from "../UncontrolledInputSkeleton";

const UncontrolledInputDatePicker = (
  {
    value,
    error,
    style,
    inlineError = false,
    isShowLabelWhenFocusing = false,
    isRequired,
    onChange,
    ...props
  },
  ref
) => {
  const containerRef = useRef(null);

  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);

  const handleShowDropdownMenu = useCallback(() => {
    setIsShowDropdownMenu(true);
  }, []);

  const handleOnChangeRangeDate = (rangeDate) => {
    onChange?.(rangeDate);
    setIsShowDropdownMenu(false);
  };

  useEffect(() => {
    if (containerRef.current == null) {
      return undefined;
    }
    const toggleButtonElement = containerRef.current;
    const handleClickOutside = (event) => {
      if (toggleButtonElement.contains(event.target)) {
        return;
      }
      setIsShowDropdownMenu(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <UncontrolledInputSkeleton
        {...(value === undefined || isEmpty(value)
          ? { value: "" }
          : {
              value: dayjs(value[0])
                .format("YYYY/MM/DD")
                .concat(" - ", dayjs(value[1]).format("YYYY/MM/DD")),
            })}
        error={error}
        style={style}
        inlineError={inlineError}
        isShowLabelWhenFocusing={isShowLabelWhenFocusing}
        isRequired={isRequired}
        isAvailableValue={!isEmpty(value)}
        readOnly
        eventWhenFocus={handleShowDropdownMenu}
        ref={ref}
        {...props}
      >
        {isShowDropdownMenu && (
          <DatePickerDropdown
            containerRef={containerRef}
            selectedRangeDate={value}
            onChangeRangeDate={handleOnChangeRangeDate}
            isModeDatePicker
          />
        )}
      </UncontrolledInputSkeleton>
    </div>
  );
};

export default forwardRef(UncontrolledInputDatePicker);
