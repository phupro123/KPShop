import { FiEye } from "react-icons/fi";

import TableRowAction from "./TableRowAction";

const TableRowViewAction = ({ id, isDisabled, onClick }) => {
  return (
    <TableRowAction
      id={id}
      title="View"
      isDisabled={isDisabled}
      onClick={onClick}
    >
      <FiEye />
    </TableRowAction>
  );
};

export default TableRowViewAction;
