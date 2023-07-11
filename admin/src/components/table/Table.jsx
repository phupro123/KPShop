import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { camelCase, isEqual } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { normalizeTableColumns } from "../Utils/Table";
import { selectorColumn } from "./Columns/SelectorColumn";
import TableContentBody from "./TableContentBody/TableContentBody";
import TableContentHeader from "./TableContentHeader/TableContentHeader";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader/TableHeader";
//
const Table = ({
  columns: columnsProp,
  data,
  isLoading = false,
  searchGroup,
  totalRows = 0,
  onChangeState,
}) => {
  const [searchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  const [totalPages, setTotalPages] = useState(1);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnSorting, setColumnSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilter, setColumnFilter] = useState([]);
  const [tableState, setTableState] = useState({
    ...pagination,
    filterParams: columnFilter,
  });

  const columns = useMemo(
    () => [selectorColumn, ...columnsProp],
    [columnsProp]
  );

  const filterDataArray = useMemo(
    () =>
      [...searchParams].map(([key, value]) => ({
        filterBy: camelCase(key),
        values: [value],
      })),
    [searchParams]
  );

  const tableStateData = useMemo(() => {
    if (isFirstRender.current) {
      setColumnFilter(filterDataArray);
      return {
        ...pagination,
        filterParams: filterDataArray,
      };
    }

    return tableState;
  }, [filterDataArray, pagination, tableState]);

  const table = useReactTable({
    columns: normalizeTableColumns(columns),
    data,
    manualSorting: true,
    manualPagination: true,
    state: {
      pagination,
      sorting: columnSorting,
      rowSelection,
    },
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id || row.code || row._id || 0,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setColumnSorting,
    onPaginationChange: setPagination,
  });

  const tableRows = table.getRowModel().rows;
  const tableHeaderGroup = table.getHeaderGroups();

  const handleChangePageSize = (pageSize) => {
    table.setPagination({
      ...pagination,
      pageSize,
      pageIndex: 0,
    });
  };

  const handleToggleRef = useCallback(() => {
    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    const paginationOptions = pagination;
    const newTotalPages =
      Math.ceil(totalRows / paginationOptions.pageSize) || 1;

    setTotalPages(newTotalPages);
  }, [pagination, totalRows]);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    const newTableState = {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      filterParams: columnFilter,
    };

    setTableState((prev) => {
      const isChangeFilter = !isEqual(
        prev.filterParams,
        newTableState.filterParams
      );

      if (isChangeFilter) {
        newTableState.pageIndex = 0;
        setPagination((prevPagination) => ({
          ...prevPagination,
          pageIndex: 0,
        }));
        return newTableState;
      }

      if (!isEqual(prev, newTableState)) {
        return newTableState;
      }

      return prev;
    });
  }, [pagination, columnFilter]);

  useEffect(() => {
    const convertTableState = Object.fromEntries(
      tableStateData.filterParams.map((obj) => [obj.filterBy, ...obj.values])
    );
    onChangeState?.({
      ...convertTableState,
      pageSize: 10,
      pageIndex: (tableStateData.pageIndex ?? 0) + 1,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [tableStateData, onChangeState]);

  return (
    <div>
      <TableHeader
        headerGroups={tableHeaderGroup}
        searchGroup={searchGroup}
        onChangeFilter={setColumnFilter}
        onToggleRef={handleToggleRef}
      />
      <div className="overflow-auto">
        <table className="relative min-w-full">
          <TableContentHeader headerGroups={tableHeaderGroup} />
          <TableContentBody
            rows={tableRows}
            headers={tableHeaderGroup[0].headers}
            isLoading={isLoading}
          />
        </table>
      </div>
      {(!!tableRows.length || isLoading) && (
        <TableFooter
          isLoading={isLoading}
          pageIndex={table.getState().pagination.pageIndex}
          pageSize={table.getState().pagination.pageSize}
          dataLength={tableRows.length}
          totalRows={totalRows ?? 0}
          totalPages={totalPages}
          onChangePageIndex={table.setPageIndex}
          onChangePageSize={handleChangePageSize}
        />
      )}
    </div>
  );
};

export default Table;
