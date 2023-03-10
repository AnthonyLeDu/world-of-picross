/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { initBoard, toggleCell } from '../actions/board';

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
const INIT_ROWS_COUNT = 10;
const INIT_COLUMNS_COUNT = 10;

const initialState = {
  rowsCount: INIT_ROWS_COUNT,
  columnsCount: INIT_COLUMNS_COUNT,
  table: createTable(INIT_ROWS_COUNT, INIT_COLUMNS_COUNT),
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder
    .addCase(initBoard, (state) => {
      state.table = createTable(state.rowsCount, state.columnsCount);
    })
    .addCase(toggleCell, (state, action) => {
      const cell = state.table.at(action.payload.row).at(action.payload.column);
      switch (cell.checkState) {
        case null:
          cell.checkState = true; // checked
          break;
        case true:
          cell.checkState = false; // marked as empty
          break;
        default:
          cell.checkState = null; // default
          break;
      }
    });
});
