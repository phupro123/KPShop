import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../../components/table/Table";
import UserTableRowAction from "./UserTableRowAction";
import { Toggle } from "../../../components/Form";
import UserRole from "./UserRole";
import Avatar from "../../../components/Avatar/Avatar";
import { uniq } from "lodash";
import {
  BooleanEnum,
  StatusEnum,
  UserRoleEnum,
} from "../../../Constants/Enums";
import UserStatus from "./UserStatus";

const UserTable = ({
  data,
  isLoading,
  rows,
  onChangeState,
  onClickEdit,
  onClickDelete,
  onClickBlock,
}) => {
  const columnHelper = createColumnHelper();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.userId, {
        id: "userId",
        header: "ID",
      }),
      columnHelper.accessor((row) => row.image, {
        id: "image",
        header: "Avatar",
        cell: (props) => (
          <Avatar
            src={props.row.original.image}
            alt={props.row.original.username}
          />
        ),
      }),
      columnHelper.accessor((row) => row.fullname, {
        id: "fullname",
        header: "Full Name",
      }),
      columnHelper.accessor((row) => row.username, {
        id: "username",
        header: "Email",
      }),
      columnHelper.accessor((row) => row.role, {
        id: "role",
        header: "Role",
        cell: (props) => (
          <UserRole
            role={props.row.original?.role === "0" ? "Admin" : "User"}
          />
        ),
        meta: {
          filterBy: "key",
          customFilterBy: "role",
          filterChange: "value",
          filterLabel: "Role",
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(UserRoleEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.phone, {
        id: "phone",
        header: "Phone",
      }),
      columnHelper.accessor((row) => row.status, {
        id: "status",
        header: "Status",
        cell: (props) => (
          <UserStatus
            status={props.row.original?.status ? "actived" : "disabled"}
            abc={props.row.original}
          />
        ),
        meta: {
          filterBy: "key",
          customFilterBy: "status",
          filterChange: "value",
          filterLabel: "Status",
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(StatusEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.address?.address?.[0], {
        id: "address",
        header: "Address",
        cell: (props) => (
          <div className="w-[200px] whitespace-normal break-words">
            {props.row.original?.address[0]?.address}
          </div>
        ),
      }),
      columnHelper.accessor((row) => row.verifyMail, {
        id: "verifyMail",
        header: "Verify Mail",
        cell: (props) => (
          <div className="flex items-center justify-center">
            <Toggle isOn={props.row.original.verifyMail} disable />
          </div>
        ),
        meta: {
          filterBy: "key",
          customFilterBy: "verifyMail",
          filterChange: "value",
          filterLabel: "Verify Mail",
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(BooleanEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.accessor((row) => row.verifyPhone, {
        id: "verifyPhone",
        header: "Verify Phone",
        cell: (props) => (
          <div className="flex items-center justify-center">
            <Toggle isOn={props.row.original.verifyPhone} disable />
          </div>
        ),
        meta: {
          filterBy: "key",
          customFilterBy: "verifyPhone",
          filterChange: "value",
          filterLabel: "Verify Phone",
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(BooleanEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
      }),
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <UserTableRowAction
            id={props.row.original.userId}
            user={props.row.original}
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            onClickBlock={onClickBlock}
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
          fullname: "Full Name",
          username: "Email",
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

export default UserTable;
