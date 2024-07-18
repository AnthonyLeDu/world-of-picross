import { createReducer } from '@reduxjs/toolkit';
import { setAvailableGamesIds, setCurrentGameId, setIsLoadingGames } from '../actions/app';


// Initial state
const initialState = {
  isLoadingGames: true,
  availableGamesIds: undefined,
  currentGameId: undefined,
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder

    .addCase(setAvailableGamesIds, (state, action) => {
      state.availableGamesIds = action.payload;
    })

    .addCase(setCurrentGameId, (state, action) => {
      state.currentGameId = action.payload;
    })

    .addCase(setIsLoadingGames, (state, action) => {
      state.isLoadingGames = action.payload;
    });
});