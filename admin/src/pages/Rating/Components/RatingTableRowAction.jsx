import TableRowDeleteAction from "../../../components/table/TableRowAction/TableRowDeleteAction";
import TableRowViewAction from "../../../components/table/TableRowAction/TableRowViewAction";

const RatingTableRowAction = ({ id, onClickView, onClickDelete }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
      <TableRowViewAction id={id} onClick={onClickView} />
      <TableRowDeleteAction id={id} onClick={onClickDelete} />
    </div>
  );
};

export default RatingTableRowAction;
