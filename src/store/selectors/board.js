export const getRowsCount = (state) => state.board.rowsCount;

export const getColumnsCount = (state) => state.board.columnsCount;

export const getTableCell = (state, row, column) => {
  if (state.board.table === undefined) {
    return undefined;
  }
  const tableRow = state.board.table[row];
  return tableRow ? tableRow[column] : undefined;
};
