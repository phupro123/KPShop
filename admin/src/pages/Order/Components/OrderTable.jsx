import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import OrderTableRowAction from "./OrderTableRowAction";
import Table from "../../../components/table/Table";
import OrderStatus from "./OrderStatus";
import dayjs from "dayjs";
import { OrderStatusEnum, OrderTotalPriceEnum } from "../../../Constants/Enums";
import { uniq } from "lodash";

const OrderTable = ({
  data,
  isLoading,
  rows,
  onChangeState,
  onClickView,
  onClickEdit,
}) => {
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row._id, {
        id: "_id",
        header: "ID",
      }),
      columnHelper.accessor((row) => row.totalQuantity, {
        id: "totalQuantity",
        header: "Quantity",
      }),
      columnHelper.accessor((row) => row.totalPrice, {
        id: "totalPrice",
        header: "Total Price",
        meta: {
          filterBy: "key",
          customFilterBy: "totalPrice",
          filterChange: "value",
          filterLabel: "Total Price",
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(OrderTotalPriceEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.status, {
        id: "status",
        header: "Status",
        cell: (props) => <OrderStatus status={props.row.original.status} />,
        meta: {
          filterBy: "status",
          filterLabel: "Status",
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(OrderStatusEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.createdAt, {
        id: "createdAt",
        header: "Created At",
        cell: (props) => (
          <>
            <div>{dayjs(props.row.original.createdAt).format("M/D/YYYY")}</div>
            <div>{dayjs(props.row.original.createdAt).format("h:mm A")}</div>
          </>
        ),
      }),
      columnHelper.accessor((row) => row.updatedAt, {
        id: "updatedAt",
        header: "Updated At",
        cell: (props) => (
          <>
            <div>{dayjs(props.row.original.updatedAt).format("M/D/YYYY")}</div>
            <div>{dayjs(props.row.original.updatedAt).format("h:mm A")}</div>
          </>
        ),
        meta: {
          filterBy: "rangeDate",
          filterType: "rangeDate",
          filterLabel: "Updated At",
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <OrderTableRowAction
            id={props.row.original._id}
            onClickView={onClickView}
            onClickEdit={onClickEdit}
          />
        ),
      }),
    ],
    [columnHelper, onClickView, onClickEdit]
  );

  return (
    <Table
      data={data}
      columns={columns}
      isLoading={isLoading}
      totalRows={rows}
      onChangeState={onChangeState}
    />
  );
};

export default OrderTable;
