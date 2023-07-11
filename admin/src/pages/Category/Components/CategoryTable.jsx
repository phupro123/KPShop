import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../../components/table/Table";
import CategoryTableRowAction from "./CategoryTableRowAction";

const CategoryTable = ({
  data,
  isLoading,
  rows,
  onChangeState,
  onClickEdit,
  onClickDelete,
}) => {
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row._id, {
        id: "_id",
        header: "ID",
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: "Name",
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <CategoryTableRowAction
            id={props.row.original._id}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
          />
        ),
      }),
    ],
    [columnHelper, onClickDelete, onClickEdit]
  );

  const searchGroup = useMemo(
    () => [
      {
        key: "information",
        label: "Information",
        field: {
          name: "Name",
        },
      },
    ],
    []
  );

  return (
    <Table
      data={data}
      columns={columns}
      isLoading={isLoading}
      searchGroup={searchGroup}
      totalRows={rows}
      onChangeState={onChangeState}
    />
  );
};

export default CategoryTable;
