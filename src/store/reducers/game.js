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
  setGameCurrentContent,
  setGameIsCompleted,
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
  isCompleted: false,
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
      state.isCompleted = false;
    })

    .addCase(setGameCurrentContent, (state, action) => {
      state.currentContent = action.payload;
    })

    .addCase(setGameIsCompleted, (state, action) => {
      state.isCompleted = action.payload;
    })

    .addCase(toggleCellON, (state, action) => {
      const cellState = state.currentContent
        .at(action.payload.row)
        .at(action.payload.column);
      if (
        cellState === null ||
        cellState === false ||
        !areEqualRgbas(cellState, action.payload.rgba)  // replacing with a different color
      ) {
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
    });
});
