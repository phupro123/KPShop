import { useEffect, useState } from "react";

import TableFooterPageSizeSelector from "./TableFooterPagination/TableFooterPageSizeSelector";
import TableFooterPagination from "./TableFooterPagination/TableFooterPagination";
import TableFooterSkeleton from "./TableFooterSkeleton";

const TableFooter = ({
  pageIndex = 1,
  pageSize = 10,
  totalRows = 0,
  totalPages = 1,
  isLoading = false,
  dataLength = 0,
  onChangePageIndex: onChangePage,
  onChangePageSize,
}) => {
  const [showingFrom, setShowingFrom] = useState(1);
  const [showingTo, setShowingTo] = useState(1);

  useEffect(() => {
    let newShowingFrom = 1;
    let newShowingTo = (pageIndex + 1) * pageSize;

    if (pageIndex > 0) {
      newShowingFrom = pageIndex * pageSize + 1;
    }

    if (newShowingTo > totalRows) {
      newShowingTo = totalRows;
    }

    setShowingFrom(newShowingFrom);
    setShowingTo(newShowingTo);
  }, [pageIndex, totalRows, pageSize]);

  return (
    <div className="relative mt-6 flex items-center justify-between">
      {(!isLoading || !!dataLength) && (
        <>
          <div className="flex flex-1 items-center space-x-4">
            <TableFooterPageSizeSelector
              pageSize={pageSize}
              onChangePageSize={onChangePageSize}
            />
            <div>
              Showing {showingFrom} - {showingTo} of {totalRows}
            </div>
          </div>
          <TableFooterPagination
            pageIndex={pageIndex}
            totalPages={totalPages}
            onChangePageIndex={onChangePage}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-50" />
          )}
        </>
      )}
      {isLoading && !dataLength && <TableFooterSkeleton />}
    </div>
  );
};

export default TableFooter;
