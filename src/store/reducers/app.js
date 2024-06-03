import { createReducer } from '@reduxjs/toolkit';
import { setAvailableGames, setCurrentGame, setIsLoadingGames } from '../actions/app';


// Initial state
const initialState = {
  isLoadingGames: true,
  availableGames: undefined,
  currentGame: undefined,
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder

    .addCase(setAvailableGames, (state, action) => {
      state.availableGames = action.payload;
    })

    .addCase(setCurrentGame, (state, action) => {
      console.log(action.payload);
      state.currentGame = action.payload;
    })

    .addCase(setIsLoadingGames, (state, action) => {
      state.isLoadingGames = action.payload;
    });
});