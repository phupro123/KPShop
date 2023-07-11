import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../../components/table/Table";
import VoucherTableRowAction from "./VoucherTableRowAction";
import dayjs from "dayjs";

const VoucherTable = ({
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
      columnHelper.accessor((row) => row.voucherId, {
        id: "voucherId",
        header: "ID",
      }),
      columnHelper.accessor((row) => row.name, {
        id: "name",
        header: "Name",
      }),
      columnHelper.accessor((row) => row.title, {
        id: "title",
        header: "Title",
      }),
      columnHelper.accessor((row) => row.quantity, {
        id: "quantity",
        header: "Quantity",
      }),
      columnHelper.accessor((row) => row.expiredDate, {
        id: "expiredDate",
        header: "Expired Date",
        cell: (props) => (
          <div>
            {dayjs(props.row.original.expiredDate).format("YYYY/MM/DD")}
          </div>
        ),
        meta: {
          filterBy: "rangeDate",
          filterType: "rangeDate",
          filterLabel: "Expired Date",
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.sale, {
        id: "sale",
        header: "Sale",
        cell: (props) => Number(props.row.original.sale) + "%",
      }),
      columnHelper.accessor((row) => row.redeemUse, {
        id: "redeemUse",
        header: "RedeemUse",
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <VoucherTableRowAction
            id={props.row.original.voucherId}
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
          title: "Title",
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

export default VoucherTable;
