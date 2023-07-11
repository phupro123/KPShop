import { useMemo } from "react";

import { Checkbox } from "../../Form";

const TableHeaderFilterDropdownOptionItem = ({
  option,
  filterBy,
  customFilterBy,
  filterChange,
  maxSelection,
  selectedFilters,
  labelFactory,
  onChange,
}) => {
  const value = useMemo(
    () => (typeof option === "string" ? option : option[filterBy]),
    [option, filterBy]
  );
  const customValue = useMemo(
    () =>
      typeof option === "string"
        ? option
        : option[filterChange || customFilterBy],
    [option, filterChange, customFilterBy]
  );

  const handleChangeCheckbox = (e) => {
    const isChecked = e.target.checked;
    onChange(value, customValue, isChecked);
  };

  return (
    <label
      htmlFor={value}
      className="group flex items-center justify-start space-x-3 py-1"
    >
      <Checkbox
        id={value}
        name={filterBy}
        type={maxSelection ? "radio" : "checkbox"}
        checked={selectedFilters.includes(value)}
        className="h-5 w-5 rounded-full"
        onChange={handleChangeCheckbox}
      />
      <span className="max-w-[180px] truncate">{labelFactory(value)}</span>
    </label>
  );
};

export default TableHeaderFilterDropdownOptionItem;
