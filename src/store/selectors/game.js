import { getGame } from '../../models/game';
import { areEqualRgbas } from '../../utils';

export const getIsLoading = (state) => state.game.isLoading;

export const getIsLoaded = (state) => state.game.isLoaded;

export const getIsSaving = (state) => state.isSaving;

export const getIsSaved = (state) => state.isSaved;

export const getBoardRowsCount = (state) => getGame(state.game.id).rows_count;

export const getBoardColumnsCount = (state) =>
  getGame(state.game.id).columns_count;

export const getGameName = (state) => {
  if (state.game.id === undefined) return undefined;
  return getGame(state.game.id).name;
};

export const getCurrentRgba = (state) => state.game.currentRgba;

export const getCurrentRow = (state) => state.game.currentRow;

export const getCurrentColumn = (state) => state.game.currentColumn;

export const getBoardClues = (state) => state.game.boardClues;

export const getBoardTableCellState = (state, row, column) => {
  if (state.game.currentContent === undefined) return undefined;
  const contentRow = state.game.currentContent[row];
  return contentRow ? contentRow[column] : undefined;
};

export const getGameCurrentContent = (state) => state.game.currentContent;

export const getGameIsCompleted = (state) => state.game.isCompleted;