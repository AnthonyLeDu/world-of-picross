import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './reducers/game';
import appReducer from './reducers/app';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: {
    app: appReducer,
    game: boardReducer,
    user: userReducer,
  },
});

export default store;