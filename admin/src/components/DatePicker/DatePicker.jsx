import { useCallback, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { DatePickerContainer } from "./DatePickerContainer";

const DatePicker = ({ name, selectedRangeDate, onChange }) => {
  const [rangeDate, setRangeDate] = useState(selectedRangeDate);

  const handleOnChange = useCallback(
    (range) => {
      setRangeDate(range);
      if (!range[0] || !range[1]) {
        return;
      }

      onChange(range);
    },
    [onChange]
  );

  return (
    <ReactDatePicker
      name={name}
      selected={rangeDate[0]}
      onChange={handleOnChange}
      calendarContainer={DatePickerContainer}
      startDate={rangeDate[0]}
      endDate={rangeDate[1]}
      selectsRange
      inline
      monthsShown={2}
      disabledKeyboardNavigation
    />
  );
};

export default DatePicker;
