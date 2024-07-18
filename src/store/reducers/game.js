/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { initGameBoard, toggleCellON, toggleCellOFF } from '../actions/game';
import { getGame } from '../../models/game';


const createTable = (gameId) => {
  const game = getGame(gameId);
  const table = [];
  for (let row = 0; row < game.getRowsCount(); row += 1) {
    table.push([]);
    for (let col = 0; col < game.getColumnsCount(); col += 1) {
      table[row].push({checkState: null});
    }
  }
  return table;
};


const generateLineClues = (lineContent) => {
  const clues = [];
  let lastValue = false;
  for (let i = 0; i < lineContent.length; i++) {
    if (lineContent[i] === true) {
      if (lastValue === false) {
        lastValue = true;
        clues.push(1);
      }
      else {
        lastValue = false;
        clues[clues.length - 1] += 1;
      }
    }
  }
  // No cell ON in this line
  if (clues.length === 0) {
    clues.push(0);
  }
  return clues;
};


/**
 * Generate the clues values from the given table content.
 * @param {Number[][]} tableContent 
 */
const generateTableClues = (gameId) => {
  const game = getGame(gameId);
  // Get content column by column
  const columnsContent = [];
  for (let col = 0; col < game.content.length ; col++) {
    columnsContent.push(game.content.map(row => row[col]));
  }
  const clues = {
    rows: game.content.map(row => generateLineClues(row)),
    columns: columnsContent.map(col => generateLineClues(col))
  };
  return clues;
};


// Initial state
const initialState = {
  id: undefined,
  table: undefined,
  boardClues: undefined,
  completion: undefined,
};


// Reducer
export default createReducer(initialState, (builder) => {
  builder

    .addCase(initGameBoard, (state, action) => {
      const gameId = action.payload;
      state.id = gameId;
      state.table = createTable(gameId);
      state.boardClues = generateTableClues(gameId);
      state.completion = 0.0;
    })

    .addCase(toggleCellON, (state, action) => {
      const cell = state.table.at(action.payload.row).at(action.payload.column);
      switch (cell.checkState) {
        case true:
          cell.checkState = null; // marked as empty
          break;
        default:
          cell.checkState = true; // default
          break;
      }
    })

    .addCase(toggleCellOFF, (state, action) => {
      const cell = state.table.at(action.payload.row).at(action.payload.column);
      switch (cell.checkState) {
        case false:
          cell.checkState = null; // marked as empty
          break;
        default:
          cell.checkState = false; // default
          break;
      }
    });
});
