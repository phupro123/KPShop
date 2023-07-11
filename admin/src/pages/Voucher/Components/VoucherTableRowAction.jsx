import TableRowDeleteAction from "../../../components/table/TableRowAction/TableRowDeleteAction";
import TableRowEditAction from "../../../components/table/TableRowAction/TableRowEditAction";

const VoucherTableRowAction = ({ id, onClickEdit, onClickDelete }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowEditAction id={id} onClick={onClickEdit} />
      <TableRowDeleteAction id={id} onClick={onClickDelete} />
    </div>
  );
};

export default VoucherTableRowAction;
