import { FiTrash2 } from "react-icons/fi";

import TableRowAction from "./TableRowAction";

const TableRowDeleteAction = ({ id, isDisabled, onClick }) => {
  return (
    <TableRowAction
      id={id}
      title="Delete"
      isDisabled={isDisabled}
      status="danger"
      onClick={onClick}
    >
      <FiTrash2 />
    </TableRowAction>
  );
};

export default TableRowDeleteAction;
