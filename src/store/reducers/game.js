/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { initGameBoard, toggleCellON, toggleCellOFF, setCurrentRgba, setCurrentRow, setCurrentColumn, setIsLoading, setIsLoaded } from '../actions/game';
import { getGame } from '../../models/game';


const createTable = (gameId) => {
  const game = getGame(gameId);
  const table = [];
  for (let row = 0; row < game.rows_count; row += 1) {
    table.push([]);
    for (let col = 0; col < game.columns_count; col += 1) {
      table[row].push({ state: null });
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
  table: undefined,
  boardClues: undefined,
  completion: undefined,
  currentRgba: [0, 0, 0, 1.0],
  currentRow: undefined,
  currentColumn: undefined,
};


// Reducer
export default createReducer(initialState, (builder) => {
  builder

    .addCase(setIsLoading, (state, action) => {
      state.isLoading = action.payload;
      state.isLoaded = false;
    })

    .addCase(setIsLoaded, (state, action) => {
      state.isLoaded = action.payload;
    })

    .addCase(initGameBoard, (state, action) => {
      const gameId = action.payload;
      state.id = gameId;
      state.table = createTable(gameId);
      state.boardClues = getClues(gameId);
      state.completion = 0.0;
    })

    .addCase(toggleCellON, (state, action) => {
      const cell = state.table.at(action.payload.row).at(action.payload.column);
      if (cell.state === null || cell.state === false){
        cell.state = action.payload.rgba; // set the payload color and alpha
      }
      else {
        cell.state = null; // marked as empty
      }
    })

    .addCase(toggleCellOFF, (state, action) => {
      const cell = state.table.at(action.payload.row).at(action.payload.column);
      switch (cell.state) {
        case false:
          cell.state = null; // marked as empty
          break;
        default:
          cell.state = false; // cross
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
