import { isEmpty } from "lodash";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { twMerge } from "tailwind-merge";
import { calculateRangeDate, getRangeDateList } from "../Utils/RangeDate";
import { LoadingSkeleton } from "../Loading";
import DatePicker from "./DatePicker";
import DatePickerSelectRange from "./DatePickerSelectRange";

const DatePickerDropdown = ({
  containerRef,
  contentWrapperWidth,
  isModeDatePicker = false,
  selectedRangeDate,
  isLoading,
  isShowClearSelected,
  onClearSelectedRangeDate,
  onChangeRangeDate,
}) => {
  const dropdownRef = useRef(null);

  const [isShowRangeDate, setIsShowRangeDate] = useState(true);

  const handleSelected = useCallback(
    (selectedItem) => {
      if (selectedItem.name === "custom_range") {
        setIsShowRangeDate(true);
        return;
      }

      const { start, end } = calculateRangeDate(selectedItem);
      onChangeRangeDate([start, end]);
    },
    [onChangeRangeDate]
  );

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

    if (!isModeDatePicker) {
      return;
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
  }, [containerRef, contentWrapperWidth, isModeDatePicker]);

  useLayoutEffect(() => {
    setDropdownPosition();
  }, [setDropdownPosition, isShowRangeDate]);

  useLayoutEffect(() => {
    if (!isEmpty(selectedRangeDate) || isModeDatePicker) {
      setIsShowRangeDate(true);
      return;
    }
    setIsShowRangeDate(false);
  }, [isModeDatePicker, selectedRangeDate]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 z-20 flex flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white px-4 text-slate-700 shadow-lg shadow-gray-100"
    >
      <div className="relative pb-2.5 pt-2">
        <div className="-mx-4 flex">
          <div
            className={twMerge("w-[150px] border-gray-100", "relative py-1.5")}
          >
            {getRangeDateList()?.map((selectedItem) => (
              <DatePickerSelectRange
                key={selectedItem.name}
                selectedItem={selectedItem}
                onSelected={handleSelected}
              />
            ))}
          </div>
          {isShowRangeDate && (
            <DatePicker
              selectedRangeDate={selectedRangeDate}
              onChange={onChangeRangeDate}
              name="datePicker"
            />
          )}
        </div>
      </div>
      {isShowClearSelected && (
        <div className="border-t-2 border-gray-100">
          {isLoading ? (
            <LoadingSkeleton className="my-3 h-4 w-full" />
          ) : (
            <button
              type="button"
              className="pb-2 pt-1.5 text-left font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
              onClick={onClearSelectedRangeDate}
            >
              Clear Selection
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DatePickerDropdown;
