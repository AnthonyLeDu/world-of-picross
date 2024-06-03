/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { initBoard, toggleCellON, toggleCellOFF, setBoardIsLoading } from '../actions/board';

const createTableCell = () => ({
  checkState: null,
});

const createTable = (rowsCount, columnsCount) => {
  const table = [];
  for (let row = 0; row < rowsCount; row += 1) {
    table.push([]);
    for (let col = 0; col < columnsCount; col += 1) {
      table[row].push(createTableCell());
    }
  }
  return table;
};

const generateLineClues = (lineContent) => {
  const clues = [];
  let lastValue = 0;
  for (let i = 0; i < lineContent.length; i++) {
    if (lineContent[i] === 1) {
      if (lastValue === 0) {
        lastValue = 1;
        clues.push(1);
      }
      else {
        lastValue = 0;
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
const generateTableClues = (rowsContent) => {
  const columnsContent = rowsContent.map((_, col) => rowsContent.map(row => row[col]));
  const clues = {
    rows: rowsContent.map(row => generateLineClues(row)),
    columns: columnsContent.map(col => generateLineClues(col))
  };
  return clues;
};

// Initial state
const initialState = {
  isLoading: true,
  name: undefined,
  rowsCount: undefined,
  columnsCount: undefined,
  table: undefined,
  goalContent: undefined,
  clues: undefined,
  completion: undefined,
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder

    .addCase(initBoard, (state, action) => {
      const data = action.payload;
      state.name = data.name;
      state.goalContent = data.content;
      state.rowsCount = data.content.length;
      state.columnsCount = data.content[0].length;
      state.table = createTable(data.content.length, data.content[0].length);
      state.clues = generateTableClues(data.content);
      state.completion = 0.0;
    })

    .addCase(setBoardIsLoading, (state, action) => {
      state.isLoading = action.payload;
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
