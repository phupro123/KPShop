import TableHeaderFilter from "./TableHeaderFilter";

const TableHeaderFilterGroup = ({ headerGroups, onChangeFilters }) => {
  return (
    <>
      {headerGroups.map((headerGroup) =>
        headerGroup.headers
          .filter(
            ({
              column: {
                columnDef: { meta },
              },
            }) => meta?.getFilterOptions || meta?.filterType
          )
          .map((header) => (
            <TableHeaderFilter
              key={header.id}
              header={header}
              onChangeFilters={onChangeFilters}
            />
          ))
      )}
    </>
  );
};

export default TableHeaderFilterGroup;
