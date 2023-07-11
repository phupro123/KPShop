import { useCallback } from "react";

const DatePickerSelectRange = ({ selectedItem, onSelected }) => {
  const handleSelectedRangeDate = useCallback(() => {
    onSelected(selectedItem);
  }, [onSelected, selectedItem]);

  return (
    <div
      key={selectedItem.name}
      role="button"
      tabIndex={-1}
      className="px-4 py-1.5 hover:bg-gray-100"
      onClick={handleSelectedRangeDate}
    >
      {selectedItem.label}
    </div>
  );
};

export default DatePickerSelectRange;
