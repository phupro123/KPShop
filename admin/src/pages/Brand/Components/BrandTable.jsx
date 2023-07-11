import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import BrandTableRowAction from "./BrandTableRowAction";
import { CategoryService } from "../../../services";
import Table from "../../../components/table/Table";

const BrandTable = ({
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
      columnHelper.accessor((row) => row.category, {
        id: "category",
        header: "Category",
        meta: {
          filterBy: "name",
          customFilterBy: "category",
          filterLabel: "Category",
          filterOptionLabelFactory: (option) => String(option),
          getFilterOptions: CategoryService.getCategories,
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <BrandTableRowAction
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

export default BrandTable;
