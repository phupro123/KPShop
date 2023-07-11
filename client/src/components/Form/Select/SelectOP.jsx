import React, { Children, useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { SelectPositionEnum } from "../../../../../app/Enums/ElementEnums";

const Select = ({
  defaultValue,
  className,
  children,
  postLabel,
  position = SelectPositionEnum.BOTTOM_LEFT,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isShowOptions, setIsShowOptions] = useState(false);

  const selectRef = React.useRef(null);

  const getClassNameByPosition = (positionParam) => {
    switch (positionParam) {
      case SelectPositionEnum.BOTTOM_LEFT:
        return "left-0 top-10";
      case SelectPositionEnum.BOTTOM_RIGHT:
        return "right-0 top-11";
      case SelectPositionEnum.TOP_LEFT:
        return `left-0 bottom-[${
          (selectRef.current?.offsetHeight || 0) + 8
        }px]`;
      case SelectPositionEnum.TOP_RIGHT:
        return `right-0 bottom-[${
          (selectRef.current?.offsetHeight || 0) + 8
        }px]`;
      default:
        return "";
    }
  };

  const handleClickSelect = () => {
    setIsShowOptions((prev) => !prev);
  };

  const handleSelectOption = async (option) => {
    setSelectedOption(option);
    onChange?.(option.props.value);
  };

  useEffect(() => {
    let hasSelected = false;

    if (!children || typeof children !== "object") {
      return;
    }

    Children.forEach(children, (child) => {
      if (!child || typeof child !== "object") {
        return;
      }
      const { props } = child;
      if (props.value === defaultValue) {
        setSelectedOption(child);
        hasSelected = true;
      }
    });

    if (!hasSelected) {
      const firstChild = Children.toArray(children)[0];
      if (typeof firstChild !== "object") {
        return;
      }
      setSelectedOption(firstChild);
    }
  }, [children, defaultValue]);

  return (
    <button
      className={twMerge(
        "relative flex items-center justify-between",
        className,
        isShowOptions ? "z-10" : "z-0"
      )}
      type="button"
      ref={selectRef}
      onClick={handleClickSelect}
      onBlur={() => setIsShowOptions(false)}
    >
      {selectedOption?.props?.children}
      {postLabel && <span className="ml-2">{postLabel}</span>}
      <BiChevronDown className="ml-2" />
      <div
        className={twMerge(
          "absolute w-fit min-w-full overflow-hidden rounded-lg border-2 border-gray-100 bg-white px-0 py-3 text-left shadow-lg shadow-gray-100",
          getClassNameByPosition(position),
          !isShowOptions && "hidden"
        )}
      >
        {Children.map(children, (child) => (
          <div
            role="none"
            className={twMerge(
              selectedOption?.props?.value === child?.props?.value &&
                "bg-gray-100"
            )}
            onClick={() => handleSelectOption(child)}
          >
            {child}
          </div>
        ))}
      </div>
    </button>
  );
};

export default Select;
