import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../../components/table/Table";
import RatingDiscuss from "./RatingDiscuss";
import RatingTableRowAction from "./RatingTableRowAction";
import dayjs from "dayjs";
import RatingStar from "./RatingStar";
import { ProductService, UserService } from "../../../services";
import { StarEnum } from "../../../Constants/Enums";
import { uniq } from "lodash";

const RatingTable = ({
  data,
  isLoading,
  rows,
  onChangeState,
  onClickView,
  onClickDelete,
}) => {
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row._id, {
        id: "_id",
        header: "ID",
      }),
      columnHelper.accessor((row) => row.product, {
        id: "product",
        header: "Product",
        cell: (props) => (
          <div className="min-w-[150px]">
            {props.row.original.product?.title}
          </div>
        ),
        meta: {
          filterBy: "title",
          customFilterBy: "product_id",
          filterChange: "_id",
          filterLabel: "Product",
          filterOptionLabelFactory: (option) => String(option),
          getFilterOptions: ProductService.getProducts,
        },
      }),
      columnHelper.accessor((row) => row.user, {
        id: "user",
        header: "User",
        cell: (props) => <div>{props.row.original.user?.username}</div>,
        meta: {
          filterBy: "username",
          customFilterBy: "user_id",
          filterChange: "_id",
          filterLabel: "User",
          filterOptionLabelFactory: (option) => String(option),
          getFilterOptions: UserService.getUsers,
        },
      }),
      columnHelper.accessor((row) => row.content, {
        id: "content",
        header: "Content",
        cell: (props) => (
          <div className="whitespace-normal break-words">
            {props.row.original.content}
          </div>
        ),
      }),
      columnHelper.accessor((row) => row.star, {
        id: "star",
        header: "Star",
        cell: (props) => <RatingStar star={props.row.original.star} />,
        meta: {
          filterBy: "key",
          customFilterBy: "star",
          filterChange: "value",
          filterLabel: "Star",
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(StarEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.discuss, {
        id: "discuss",
        header: "Discuss",
        cell: (props) => <RatingDiscuss selectedRating={props.row.original} />,
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
          <RatingTableRowAction
            id={props.row.original._id}
            onClickView={onClickView}
            onClickDelete={onClickDelete}
          />
        ),
      }),
    ],
    [columnHelper, onClickView, onClickDelete]
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

export default RatingTable;
