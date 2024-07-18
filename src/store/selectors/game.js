import { getGame } from '../../models/game';

export const getBoardRowsCount = (state) => {
  return getGame(state.game.id).getRowsCount();
};

export const getBoardColumnsCount = (state) => {
  return getGame(state.game.id).getColumnsCount();
};

export const getGameName = (state) => {
  if (state.game.id === undefined) return undefined;
  return getGame(state.game.id).name;
};

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
  const game = getGame(state.game.id);
  if (game === undefined) return undefined;

  const currentTable = state.game.table;
  if (currentTable === undefined) {
    return undefined;
  }
  if (currentTable.length === 0) {
    throw new Error('Current board\'s table is empty.');
  }
  if (currentTable.length !== game.content.length) {
    throw new Error('Compared boards have a different number of rows.');
  }

  const completedCellsCount = currentTable.map((row, i) => {
    if (row.length !== game.content[i].length) {
      throw new Error('Compared rows have a different number of columns.');
    }
    return row.reduce(
      (acc, value, j) => {
        if (Boolean(game.content[i][j])) {  // expected to be ON
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