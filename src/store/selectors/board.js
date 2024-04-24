export const getRowsCount = (state) => state.board.rowsCount;

export const getColumnsCount = (state) => state.board.columnsCount;

export const getTableName = (state) => state.board.name;

export const getTableCell = (state, row, column) => {
  if (state.board.table === undefined) return undefined;
  const tableRow = state.board.table[row];
  return tableRow ? tableRow[column] : undefined;
};

/**
 * Return the completion rate (between 0 and 1) of the given board's
 * content compared to a goal board content (the solution).
 * @param {*} state Reducer state.
 */
export const getTableCompletion = (state) => {
  const currentTable = state.board.table;
  const goalContent = state.board.goalContent;
  if (currentTable === undefined) {
    return undefined;
  }
  if (currentTable.length === 0) {
    throw new Error('Current board\'s table is empty.');
  }
  if (currentTable.length !== goalContent.length) {
    throw new Error('Compared boards have a different number of rows.');
  }
  
  const completedCellsCount = currentTable.map((row, i) => {
    if (row.length !== goalContent[i].length) {
      throw new Error('Comapred rows have a different number of columns.');
    }
    return row.reduce(
      (acc, value, j) => {
        return acc += (value.checkState === Boolean(goalContent[i][j]) ? 1 : 0);
      },
      0,
    );
  })
  .reduce((acc, value) => acc + value, 0);

  return completedCellsCount / (currentTable.length * currentTable[0].length);  
};