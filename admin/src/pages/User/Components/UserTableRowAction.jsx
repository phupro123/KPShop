import TableRowAction from "../../../components/table/TableRowAction/TableRowAction";
import TableRowDeleteAction from "../../../components/table/TableRowAction/TableRowDeleteAction";
import TableRowEditAction from "../../../components/table/TableRowAction/TableRowEditAction";
import { FiLock, FiUnlock } from "react-icons/fi";

const UserTableRowAction = ({
  id,
  user,
  onClickEdit,
  onClickDelete,
  onClickBlock,
}) => {
  console.log(user?.status);
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowAction
        id={id}
        title={user?.status ? "Block" : "Unlock"}
        onClick={onClickBlock}
      >
        {user?.status ? <FiUnlock /> : <FiLock />}
      </TableRowAction>
      <TableRowEditAction id={id} onClick={onClickEdit} />
      <TableRowDeleteAction id={id} onClick={onClickDelete} />
    </div>
  );
};

export default UserTableRowAction;
