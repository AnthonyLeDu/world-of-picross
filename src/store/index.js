import { configureStore } from '@reduxjs/toolkit';
import boardReduced from './reducers/game';
import appReduced from './reducers/app';

const store = configureStore({
  reducer: {
    app: appReduced,
    game: boardReduced,
  },
});

export default store;