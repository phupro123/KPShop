import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import Table from "../../../components/table/Table";
import ProductTableRowAction from "./ProductTableRowAction";
import Avatar from "../../../components/Avatar/Avatar";
import { BrandService, CategoryService } from "../../../services";
import { ProductPriceEnum, StarEnum } from "../../../Constants/Enums";
import { uniq } from "lodash";

const ProductTable = ({
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
      columnHelper.accessor((row) => row.img, {
        id: "img",
        header: "Image",
        cell: (props) => (
          <Avatar
            src={props.row.original.img}
            alt={props.row.original.title}
            className="rounded-md"
          />
        ),
      }),
      columnHelper.accessor((row) => row.title, {
        id: "title",
        header: "Name",
        cell: (props) => (
          <div className="min-w-[150px]">{props.row.original.title}</div>
        ),
      }),
      columnHelper.accessor((row) => row.price, {
        id: "price",
        header: "Price",
        meta: {
          filterBy: "key",
          customFilterBy: "price",
          filterChange: "value",
          filterLabel: "Price",
          filterType: "enum",
          getFilterDataEnum: uniq(Object.values(ProductPriceEnum)),
          filterOptionLabelFactory: (option) => String(option),
        },
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
      columnHelper.accessor((row) => row.brand, {
        id: "brand",
        header: "Brand",
        meta: {
          filterBy: "name",
          customFilterBy: "brand",
          filterLabel: "Brand",
          filterOptionLabelFactory: (option) => String(option),
          getFilterOptions: BrandService.getBrands,
        },
      }),
      columnHelper.accessor((row) => row.discount, {
        id: "discount",
        header: "Discount",
        cell: (props) => props.row.original.discount + "%",
      }),
      columnHelper.accessor((row) => row.star, {
        id: "star",
        header: "Star",
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
      columnHelper.display({
        id: "actions",
        cell: (props) => (
          <ProductTableRowAction
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
          title: "Name",
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

export default ProductTable;
