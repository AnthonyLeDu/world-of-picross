/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import {
  initGameBoard,
  setCurrentRgba,
  setCurrentRow,
  setCurrentColumn,
  setIsLoading,
  setIsLoaded,
  setIsSaved,
  setIsSaving,
  setGameCurrentContent,
  setGameIsCompleted,
  setIsLeftMouseButtonDown,
  setIsRightMouseButtonDown,
  setCurrentPaintingState,
  paintCell,
  setGameLastSavedContent,
} from '../actions/game';
import { getGame } from '../../models/game';

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
  lastSavedContent: undefined,
  boardClues: undefined,
  isCompleted: false,
  currentRgba: [0, 0, 0, 1.0],
  currentRow: undefined,
  currentColumn: undefined,
  isSaving: false,
  isSaved: undefined,
  isLeftMouseButtonDown: false,
  isRightMouseButtonDown: false,
  currentPaintingState: undefined,
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

    .addCase(setIsLeftMouseButtonDown, (state, action) => {
      state.isLeftMouseButtonDown = action.payload;
      // Make sure left and right cannot be true at the same time
      if (action.payload === true) {
        state.isRightMouseButtonDown = false;
      } else if (state.isRightMouseButtonDown === false) {
        state.currentPaintingState = undefined;
      }
    })

    .addCase(setIsRightMouseButtonDown, (state, action) => {
      state.isRightMouseButtonDown = action.payload;
      // Make sure left and right cannot be true at the same time
      if (action.payload === true) {
        state.isLeftMouseButtonDown = false;
      } else if (state.isLeftMouseButtonDown === false) {
        state.currentPaintingState = undefined;
      }
    })

    .addCase(initGameBoard, (state, action) => {
      const gameId = action.payload;
      state.id = gameId;
      state.currentContent = createContentTable(gameId);
      state.lastSavedContent = undefined;
      state.boardClues = getClues(gameId);
      state.isCompleted = false;
    })

    .addCase(setGameCurrentContent, (state, action) => {
      state.currentContent = action.payload;
    })

    .addCase(setGameLastSavedContent, (state, action) => {
      state.lastSavedContent = action.payload;
    })

    .addCase(setGameIsCompleted, (state, action) => {
      state.isCompleted = action.payload;
    })

    .addCase(setCurrentPaintingState, (state, action) => {
      state.currentPaintingState = action.payload;
    })

    .addCase(paintCell, (state, action) => {
      state.currentContent[action.payload.row][action.payload.column] =
        state.currentPaintingState;
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
