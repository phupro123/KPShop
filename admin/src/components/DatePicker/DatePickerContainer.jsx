import { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerContainer = ({ children }) => {
  return (
    <CalendarContainer className="relative flex border-l-2 border-gray-100 bg-white px-4">
      {children}
    </CalendarContainer>
  );
};
