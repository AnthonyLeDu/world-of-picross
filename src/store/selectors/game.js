import { getGame } from '../../models/game';
import { areEqualRgbas } from '../../utils';

export const getIsLoading = (state) => state.game.isLoading;
export const getIsLoaded = (state) => state.game.isLoaded;

export const getBoardRowsCount = (state) => {
  return getGame(state.game.id).rows_count;
};

export const getBoardColumnsCount = (state) => {
  return getGame(state.game.id).columns_count;
};

export const getGameName = (state) => {
  if (state.game.id === undefined) return undefined;
  return getGame(state.game.id).name;
};

export const getCurrentRgba = (state) => {
  return state.game.currentRgba;
};

export const getCurrentRow = (state) => {
  return state.game.currentRow;
};

export const getCurrentColumn = (state) => {
  return state.game.currentColumn;
};

export const getBoardClues = (state) => state.game.boardClues;

export const getBoardTableCell = (state, row, column) => {
  if (state.game.table === undefined) return undefined;
  const tableRow = state.game.table[row];
  return tableRow ? tableRow[column] : undefined;
};

/**
 * Return the completion rate (between 0 and 1) of the given board's
 * table compared to a goal board table (the solution).
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
      (acc, cell, j) => {
        const expectedCellState = game.content[i][j];
        if (expectedCellState) {  // Not null/undefined/false
          return acc += (areEqualRgbas(cell.state, expectedCellState) ? 1 : 0);
        }
        return acc += 1;
      },
      0,
    );
  })
    .reduce((acc, value) => acc + value, 0);

  return completedCellsCount / (currentTable.length * currentTable[0].length);
};