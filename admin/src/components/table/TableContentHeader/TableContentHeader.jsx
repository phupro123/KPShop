import { flexRender } from "@tanstack/react-table";

import TableContentHeaderColumn from "./TableContentHeaderColumn";

const TableContentHeader = ({ headerGroups, onChangeSort }) => {
  return (
    <thead className="overflow-hidden">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id} className="relative">
          {headerGroup.headers.map((header) => (
            <TableContentHeaderColumn
              key={header.id}
              id={header.id}
              isSorted={header.column.getIsSorted()}
              isSortable={header.column.getCanSort()}
              toggleSorting={header.column.toggleSorting}
            >
              <div>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </div>
            </TableContentHeaderColumn>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableContentHeader;
