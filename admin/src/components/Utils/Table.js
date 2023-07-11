const normalizeTableColumn = (column) => {
  const defaultCellColumn = (info) => info.getValue() ?? "-";
  return {
    cell: defaultCellColumn,
    ...column,
  };
};

const normalizeTableColumns = (columns) => columns.map(normalizeTableColumn);

export { normalizeTableColumn, normalizeTableColumns };
