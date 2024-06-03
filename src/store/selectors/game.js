export const getGameIsLoading = (state) => state.game.isLoading;

export const getBoardRowsCount = (state) => state.game.boardRowsCount;

export const getBoardColumnsCount = (state) => state.game.boardColumnsCount;

export const getGameName = (state) => state.game.name;

export const getBoardClues = (state) => state.game.boardClues;

export const getBoardTableCell = (state, row, column) => {
  if (state.game.table === undefined) return undefined;
  const tableRow = state.game.table[row];
  return tableRow ? tableRow[column] : undefined;
};

/**
 * Return the completion rate (between 0 and 1) of the given board's
 * content compared to a goal board content (the solution).
 * @param {*} state Reducer state.
 */
export const getCompletion = (state) => {
  const currentTable = state.game.table;
  const goalContent = state.game.goalContent;
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
      throw new Error('Compared rows have a different number of columns.');
    }
    return row.reduce(
      (acc, value, j) => {
        if (Boolean(goalContent[i][j])) {  // expected to be ON
          return acc += (value.checkState === true ? 1 : 0);
        }
        // expected to be OFF
        return acc += (value.checkState !== true ? 1 : 0);
      },
      0,
    );
  })
    .reduce((acc, value) => acc + value, 0);

  return completedCellsCount / (currentTable.length * currentTable[0].length);
};