import { useCallback } from "react";

const DatePickerSelectSingle = ({ selectedItem, onSelected }) => {
  const handleSelectedSingleDate = useCallback(() => {
    onSelected(selectedItem);
  }, [onSelected, selectedItem]);

  return (
    <div
      key={selectedItem.name}
      role="button"
      tabIndex={-1}
      className="px-4 py-1.5 hover:bg-gray-100"
      onClick={handleSelectedSingleDate}
    >
      {selectedItem.label}
    </div>
  );
};

export default DatePickerSelectSingle;
