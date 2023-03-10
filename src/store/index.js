import { configureStore } from '@reduxjs/toolkit';
import boardReduced from './reducers/board';

const store = configureStore({
  reducer: {
    board: boardReduced,
  },
});

export default store;