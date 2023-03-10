export const getRowsCount = (state) => state.board.rowsCount;

export const getColumnsCount = (state) => state.board.columnsCount;

export const getTableCell = (state, row, column) => {
  const tableRow = state.board.table[row];
  return tableRow ? tableRow[column] : undefined;
};
