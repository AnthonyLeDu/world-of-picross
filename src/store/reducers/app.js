import { createReducer } from '@reduxjs/toolkit';
import {
  setAvailableGamesIds,
  setCurrentAuthForm,
  setCurrentGameId,
  setIsLoadingGamesSummaries,
} from '../actions/app';

// Initial state
const initialState = {
  currentAuthForm: 'login',
  isLoadingGamesSummaries: true,
  availableGamesIds: undefined,
  currentGameId: undefined,
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder

    .addCase(setCurrentAuthForm, (state, action) => {
      state.currentAuthForm = action.payload;
    })

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
