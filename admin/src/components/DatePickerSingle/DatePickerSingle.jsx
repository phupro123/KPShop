import { useCallback, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { DatePickerContainer } from "./DatePickerContainer";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ name, selectedDate, onChange }) => {
  const [date, setDate] = useState(new Date());
  const handleOnChange = useCallback(
    (range) => {
      setDate(range);
      onChange(range);
    },
    [onChange]
  );

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <ReactDatePicker
      name={name}
      selected={dayjs(date).toDate()}
      onChange={handleOnChange}
      calendarContainer={DatePickerContainer}
      inline
      disabledKeyboardNavigation
    />
  );
};

export default DatePicker;
