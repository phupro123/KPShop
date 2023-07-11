import { FiEdit2 } from "react-icons/fi";

import TableRowAction from "./TableRowAction";

const TableRowEditAction = ({ id, isDisabled, onClick }) => {
  return (
    <TableRowAction
      id={id}
      title="Edit"
      isDisabled={isDisabled}
      onClick={onClick}
    >
      <FiEdit2 />
    </TableRowAction>
  );
};

export default TableRowEditAction;
