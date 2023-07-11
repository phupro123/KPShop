import { twMerge } from "tailwind-merge";

import TableContentHeaderSortIcon from "./TableContentHeaderSortIcon";

const TableContentHeaderColumn = ({
  id,
  isSortable,
  isSorted,
  children,
  toggleSorting,
}) => {
  const handleClickSortButton = () => {
    if (isSortable) {
      const newSortDirection = isSorted === "asc" ? "desc" : "asc";
      toggleSorting(newSortDirection === "desc");
    }
  };

  return (
    <th
      key={id}
      className={twMerge(
        "whitespace-nowrap border-gray-50 bg-gray-50 px-4 py-4 font-semibold first:rounded-l-lg last:rounded-r-lg",
        id === "selector" && "sticky left-0 z-10",
        id === "actions" && "sticky right-0 z-10"
      )}
    >
      <div
        className={twMerge(
          "group relative block cursor-pointer",
          isSortable && "inline-flex"
        )}
        role="button"
        tabIndex={0}
        onClick={handleClickSortButton}
      >
        <div
          className={twMerge(
            "relative left-1/2 -translate-x-1/2 duration-100",
            isSortable &&
              (isSorted !== true || typeof isSorted !== "string") &&
              "group-hover:left-0 group-hover:translate-x-0",
            Boolean(isSorted) && "left-0 translate-x-0"
          )}
        >
          {children}
        </div>
        {isSortable && (
          <TableContentHeaderSortIcon
            isSorted={isSorted}
            className="ml-1 opacity-0 transition-transform duration-100 group-hover:opacity-100"
          />
        )}
      </div>
    </th>
  );
};

export default TableContentHeaderColumn;
