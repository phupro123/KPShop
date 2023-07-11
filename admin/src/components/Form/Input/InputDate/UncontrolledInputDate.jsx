import dayjs from "dayjs";
import _ from "lodash";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import DatePickerDropdown from "../../../DatePickerSingle/DatePickerDropdown";

const UncontrolledInputDatePicker = (
  {
    label,
    id,
    value,
    className,
    isRequired = true,
    disabled = false,
    children,
    error,
    style,
    size = "normal",
    inlineError = false,
    isShowLabelWhenFocusing = false,
    labelPostfix,
    onFocus,
    onChange,
    ...props
  },
  ref
) => {
  const containerRef = useRef(null);

  const [isFocusing, setIsFocusing] = useState(false);
  const [isShowDropdownMenu, setIsShowDropdownMenu] = useState(false);

  const handleFocus = () => {
    setIsFocusing(true);
    if (_.isFunction(onFocus)) onFocus();
    setIsShowDropdownMenu(true);
  };

  let borderColor = Boolean(error) && "border-red-500 z-20";
  let textColor = Boolean(error) && "text-red-500";

  if (isFocusing) {
    borderColor = "border-blue-500 z-20";
  } else {
    borderColor = "border-gray-100";
  }

  if (isFocusing || Boolean(value)) {
    textColor = "text-blue-500";
  } else {
    textColor = "text-gray-500";
  }
  const sizeClassNames = {
    block: "",
    label: "",
    focusingLabel: "",
    focusingInput: "",
    input: "",
  };

  switch (size) {
    case "xs":
      sizeClassNames.block = "h-8 px-3";
      sizeClassNames.label =
        "text-sm px-2 left-1 top-1/2 -translate-y-1/2 bg-transparent";
      sizeClassNames.focusingLabel = "hidden";
      sizeClassNames.input = "text-sm translate-y-1";
      break;
    case "sm":
      sizeClassNames.block = "h-10 px-3";
      sizeClassNames.label =
        "px-2 left-1 text-base top-1/2 -translate-y-1/2 bg-transparent";
      sizeClassNames.focusingLabel = isShowLabelWhenFocusing
        ? "-translate-y-5 bg-inherit"
        : "hidden";
      sizeClassNames.input = "text-normal translate-y-[7px] text-base";
      break;
    default:
      sizeClassNames.block = "h-13 px-4";
      sizeClassNames.label = twMerge(
        "px-2 left-2 top-1/2 -translate-y-1/2",
        !disabled ? "bg-white" : "bg-transparent"
      );
      sizeClassNames.focusingLabel = "-translate-y-4 -mt-0.5 text-sm";
      sizeClassNames.input = "text-normal top-1/2 translate-y-1/2";
  }

  useEffect(() => {
    if (disabled) {
      setIsFocusing(false);
    }
  }, [disabled]);

  const handleOnChangeDate = (date) => {
    onChange?.(date);
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
      setIsFocusing(false);
      setIsShowDropdownMenu(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <label
        htmlFor={id}
        style={style}
        className={twMerge(
          "relative inline-block rounded-lg border-2 bg-white ring-inset transition-colors duration-100",
          sizeClassNames.block,
          disabled ? "cursor-default bg-gray-50 ring-gray-100" : "cursor-text",
          className,
          borderColor,
          Boolean(error) && "border-red-500 ring-red-500"
        )}
      >
        <div
          className={twMerge(
            "z-10 flex items-center justify-between transition-all",
            textColor,
            sizeClassNames.label,
            (isFocusing || Boolean(value)) &&
              twMerge(
                "top-1.5 text-sm font-semibold duration-100",
                sizeClassNames.focusingLabel
              ),
            Boolean(error) && "text-red-500",
            "absolute",
            disabled && "text-gray-400"
          )}
        >
          {(isFocusing || Boolean(value)) && (
            <div
              className={twMerge(
                "absolute inset-y-0 left-0 top-1/2 -z-10 w-full -translate-y-0.5",
                disabled && "mt-0.5 h-1 bg-gray-50"
              )}
            />
          )}
          {label}
          {isRequired && <div className="text-red-500 text-lg ml-1">*</div>}
        </div>
        {labelPostfix != null && (
          <div className="absolute bottom-0 right-0 top-0 z-20 flex flex-col items-center justify-center px-[inherit]">
            {labelPostfix}
          </div>
        )}
        <div
          className={twMerge(
            "relative flex items-center justify-start",
            isFocusing || Boolean(value) ? "opacity-100" : "opacity-0"
          )}
        >
          {children && <div>{children}</div>}
          <input
            id={id}
            className={twMerge(
              "w-full border-none bg-inherit outline-none transition-none",
              sizeClassNames.input,
              disabled && "text-gray-400"
            )}
            disabled={disabled}
            ref={ref}
            onFocus={handleFocus}
            readOnly
            {...(!Boolean(value)
              ? { value: dayjs(new Date()).format("YYYY/MM/DD") }
              : {
                  value: dayjs(value).format("YYYY/MM/DD"),
                })}
            {...props}
          />
        </div>
      </label>
      {isShowDropdownMenu && (
        <DatePickerDropdown
          containerRef={containerRef}
          selectedDate={value}
          onChangeDate={handleOnChangeDate}
        />
      )}
      {!inlineError && Boolean(error) && (
        <div className="-mb-1.5 mt-1.5 text-sm text-red-500">{error}</div>
      )}
    </div>
  );
};

export default forwardRef(UncontrolledInputDatePicker);
