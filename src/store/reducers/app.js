import { createReducer } from '@reduxjs/toolkit';
import { setAvailableGamesIds, setCurrentGameId, setIsLoadingGamesSummaries } from '../actions/app';


// Initial state
const initialState = {
  isLoadingGamesSummaries: true,
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

    .addCase(setIsLoadingGamesSummaries, (state, action) => {
      state.isLoadingGamesSummaries = action.payload;
    });
});