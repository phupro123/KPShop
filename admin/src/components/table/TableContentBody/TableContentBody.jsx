import { flexRender } from "@tanstack/react-table";
import { twMerge } from "tailwind-merge";

import TableContentBodyColumnContent from "./TableContentBodyColumnContent";
import TableBodyEmpty from "./TableContentBodyEmpty";
import TableContentBodySkeleton from "./TableContentBodySkeleton";

const TableContentBody = ({ rows, headers, isLoading = false }) => {
  const totalSkeletonItems = 4;

  return (
    <tbody>
      {rows.length === 0 &&
        isLoading &&
        Array.from({ length: totalSkeletonItems }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableContentBodySkeleton key={index} headers={headers} />
        ))}
      {rows.length === 0 && !isLoading && (
        <TableBodyEmpty columns={headers.length} />
      )}
      {rows.length > 0 &&
        rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={twMerge(
                  "relative border-b border-gray-50 bg-white px-4 py-4 text-center",
                  cell.column.id === "selector" && "sticky left-0",
                  cell.column.id === "actions" && "sticky right-0"
                )}
              >
                {isLoading && (
                  <div className="absolute inset-0 z-10 bg-white bg-opacity-50" />
                )}
                <TableContentBodyColumnContent
                  content={flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                />
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  );
};

export default TableContentBody;
