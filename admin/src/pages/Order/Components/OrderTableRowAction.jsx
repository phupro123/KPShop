import TableRowViewAction from "../../../components/table/TableRowAction/TableRowViewAction";
import TableRowEditAction from "../../../components/table/TableRowAction/TableRowEditAction";

const OrderTableRowAction = ({ id, onClickView, onClickEdit }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowViewAction id={id} onClick={onClickView} />
      <TableRowEditAction id={id} onClick={onClickEdit} />
    </div>
  );
};

export default OrderTableRowAction;
