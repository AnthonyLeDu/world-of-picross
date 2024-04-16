/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { initBoard, toggleCellON, toggleCellOFF } from '../actions/board';

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

// Initial state
const initialState = {
  name: undefined,
  table: undefined,
  rowsCount: undefined,
  columnsCount: undefined,
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder
    .addCase(initBoard, (state, action) => {
      const data = action.payload;
      state.rowsCount = data.rowsCount;
      state.columnsCount = data.columnsCount;
      state.content = data.content;
      state.table = createTable(data.rowsCount, data.columnsCount);
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
