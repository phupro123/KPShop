import { nanoid } from "@reduxjs/toolkit";

import { Checkbox } from "../Form";

const TableSelectorColumn = ({ isSelected, onToggle }) => {
  return (
    <div className="flex w-5 items-center pt-1">
      <Checkbox
        name={`tableSelector${nanoid()}`}
        checked={isSelected}
        onChange={onToggle}
      />
    </div>
  );
};

export default TableSelectorColumn;
