import { Checkbox } from "../Form";

const TableSelectorColumnHeader = ({
  isSelectedAll,
  isSelectedSome,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-start pt-1">
      <Checkbox
        name="tableSelectorHeader"
        checked={isSelectedAll}
        indeterminate={isSelectedSome}
        onChange={onChange}
      />
    </div>
  );
};

export default TableSelectorColumnHeader;
