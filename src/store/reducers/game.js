/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
  initGameBoard,
  toggleCellON,
  toggleCellOFF,
  setCurrentRgba,
  setCurrentRow,
  setCurrentColumn,
  setIsLoading,
  setIsLoaded,
  setIsSaved,
  setIsSaving,
  updateCompletion,
  setGameCurrentContent,
} from '../actions/game';
import { getGame } from '../../models/game';
import { areEqualRgbas } from '../../utils';

const createContentTable = (gameId) => {
  const game = getGame(gameId);
  const table = [];
  for (let row = 0; row < game.rows_count; row += 1) {
    table.push([]);
    for (let col = 0; col < game.columns_count; col += 1) {
      table[row].push(null);
    }
  }
  return table;
};

const getClues = (gameId) => {
  const game = getGame(gameId);
  return game.clues || undefined;
};

// Initial state
const initialState = {
  id: undefined,
  isLoading: undefined,
  isLoaded: undefined,
  currentContent: undefined,
  boardClues: undefined,
  completion: undefined,
  currentRgba: [0, 0, 0, 1.0],
  currentRow: undefined,
  currentColumn: undefined,
  isSaving: false,
  isSaved: undefined,
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder

    .addCase(setIsLoading, (state, action) => {
      state.isLoading = action.payload;
      if (action.payload === true) {
        // is Loading === true
        state.isLoaded = false;
      }
    })

    .addCase(setIsLoaded, (state, action) => {
      state.isLoaded = action.payload;
    })

    .addCase(setIsSaving, (state, action) => {
      state.isSaving = action.payload;
    })

    .addCase(setIsSaved, (state, action) => {
      state.isSaved = action.payload;
    })

    .addCase(initGameBoard, (state, action) => {
      const gameId = action.payload;
      state.id = gameId;
      state.currentContent = createContentTable(gameId);
      state.boardClues = getClues(gameId);
      state.completion = 0.0;
    })

    .addCase(setGameCurrentContent, (state, action) => {
      state.currentContent = action.payload;
    })

    .addCase(toggleCellON, (state, action) => {
      const cellState = state.currentContent
        .at(action.payload.row)
        .at(action.payload.column);
      if (cellState === null || cellState === false) {
        state.currentContent[action.payload.row][action.payload.column] =
          action.payload.rgba; // set the payload color and alpha
      } else {
        state.currentContent[action.payload.row][action.payload.column] = null; // marked as empty
      }
    })

    .addCase(toggleCellOFF, (state, action) => {
      const cellState = state.currentContent
        .at(action.payload.row)
        .at(action.payload.column);
      switch (cellState) {
        case false:
          state.currentContent[action.payload.row][action.payload.column] =
            null; // marked as empty
          break;
        default:
          state.currentContent[action.payload.row][
            action.payload.column
          ] = false; // cross
          break;
      }
    })
    .addCase(setCurrentRgba, (state, action) => {
      state.currentRgba = action.payload;
    })

    .addCase(setCurrentRow, (state, action) => {
      state.currentRow = action.payload;
    })

    .addCase(setCurrentColumn, (state, action) => {
      state.currentColumn = action.payload;
    })

    .addCase(updateCompletion, (state, _) => {
      // Calculate the completion rate (between 0 and 1) of the board's
      // content compared to the goal content (the solution).
      const game = getGame(state.id);
      if (game === undefined || state.currentContent === undefined) {
        state.completion = undefined;
        return;
      }

      if (state.currentContent.length === 0) {
        throw new Error("Current board's table is empty.");
      }
      if (state.currentContent.length !== game.content.length) {
        throw new Error('Compared boards have a different number of rows.');
      }

      const completedCellsCount = state.currentContent
        .map((row, i) => {
          if (row.length !== game.content[i].length) {
            throw new Error(
              'Compared rows have a different number of columns.'
            );
          }
          return row.reduce((acc, cellState, j) => {
            const expectedCellState = game.content[i][j];
            if (expectedCellState) {
              // Not null/undefined/false
              return (acc += areEqualRgbas(cellState, expectedCellState)
                ? 1
                : 0);
            }
            return (acc += 1);
          }, 0);
        })
        .reduce((acc, value) => acc + value, 0);

      state.completion =
        completedCellsCount /
        (state.currentContent.length * state.currentContent[0].length);
    });
});
