import { useCallback, useLayoutEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "./DatePickerSingle";

const DatePickerSingleDropdown = ({
  containerRef,
  contentWrapperWidth,
  selectedDate,
  onChangeDate,
}) => {
  const dropdownRef = useRef(null);

  const setDropdownPosition = useCallback(() => {
    const containerElement = containerRef.current;
    const dropdownElement = dropdownRef.current;
    if (!containerElement || !dropdownElement) {
      return;
    }
    const contentWidth = contentWrapperWidth || window.innerWidth;

    const overflowWidth = contentWidth - containerElement.offsetLeft;

    if (overflowWidth < dropdownElement.offsetWidth) {
      dropdownElement.style.left = `${
        overflowWidth - dropdownElement.offsetWidth
      }px`;
    } else {
      dropdownElement.style.left = "0px";
    }

    const overflowHeight =
      window.innerHeight -
      containerElement.offsetTop -
      Number(containerElement.offsetHeight) -
      8;
    if (
      overflowHeight < dropdownElement.offsetHeight &&
      containerElement.offsetTop > dropdownElement.offsetHeight
    ) {
      dropdownElement.style.top = `${-dropdownElement.offsetHeight - 8}px`;
    } else {
      dropdownElement.style.top = `${
        Number(containerElement.offsetHeight) + 8
      }px`;
    }
  }, [containerRef, contentWrapperWidth]);

  useLayoutEffect(() => {
    setDropdownPosition();
  }, [setDropdownPosition]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 z-20 flex flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white px-4 text-slate-700 shadow-lg shadow-gray-100"
    >
      <div className="relative pb-2.5 pt-2">
        <div className="-mx-4 flex">
          <DatePicker
            selectedDate={selectedDate}
            onChange={onChangeDate}
            name="datePicker"
          />
        </div>
      </div>
    </div>
  );
};

export default DatePickerSingleDropdown;
