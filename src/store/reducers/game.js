/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { initGameBoard, toggleCellON, toggleCellOFF, setCurrentRgba } from '../actions/game';
import { getGame } from '../../models/game';
import { act } from 'react';
import { areEqualRgbas } from '../../utils';


const createTable = (gameId) => {
  const game = getGame(gameId);
  const table = [];
  for (let row = 0; row < game.getRowsCount(); row += 1) {
    table.push([]);
    for (let col = 0; col < game.getColumnsCount(); col += 1) {
      table[row].push({ state: null });
    }
  }
  return table;
};


const generateLineClues = (lineContent) => {
  const clues = [];
  let lastRgba = false;
  let lastIndex = undefined;
  // In the content data, only cells with info are stored so we look for gaps
  // to determine there are empty cells or color changes.
  for (let i = 0; i < lineContent.length; i++) {
    const rgba = lineContent[i];
    if (
      lastIndex !== undefined  // Not the first cell
      && i === lastIndex + 1  // Next to the previous cell
      && areEqualRgbas(rgba, lastRgba)  // Same color than previous cell
    ) {
      clues[clues.length - 1].count += 1; // Increment cells count
    }
    else {
      if (rgba === null) {
        lastRgba = false;
      }
      else {
        // Add new clue
        clues.push({
          rgba: rgba.slice(),  // Copy by value
          count: 1,
        });
        lastRgba = rgba.slice();
      }
    }
    lastIndex = i;
  };

  // No cell ON in this line
  if (clues.length === 0) {
    clues.push(null);
  }
  return clues;
};




/**
 * Generate the clues values from the given table content.
 * @param {Number[][]} tableContent 
 */
const generateTableClues = (gameId) => {
  const game = getGame(gameId);
  const fullContent = game.asFullTable();
  const columnsContent = [];
  for (let col = 0; col < game.getColumnsCount(); col++) {
    columnsContent.push(fullContent.map(row => row[col]));
  }
  const clues = {
    rows: fullContent.map(rowContent => generateLineClues(rowContent)),
    columns: columnsContent.map(colContent => generateLineClues(colContent))
  };
  return clues;
};


// Initial state
const initialState = {
  id: undefined,
  table: undefined,
  boardClues: undefined,
  completion: undefined,
  currentRgba: [0, 0, 0, 1.0],
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
    });
});
