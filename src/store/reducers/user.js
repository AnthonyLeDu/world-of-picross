import { createReducer } from '@reduxjs/toolkit';
import { setCreatedGames, setId, setIsLoggedIn, setIsLoggingIn, setLoginMessage, setEmail, setPlayedGames, setPseudo } from '../actions/user';


// Initial state
const initialState = {
  isLoggingIn: false,
  isLoggedIn: undefined,
  loginMessage: '',
  id: undefined,
  email: undefined,
  pseudo: undefined,
  createdGames: undefined,
  playedGames: undefined,
};

// Reducer
export default createReducer(initialState, (builder) => {
  builder

    .addCase(setIsLoggingIn, (state, action) => {
      state.isLoggingIn = action.payload;
    })

    .addCase(setIsLoggedIn, (state, action) => {
      state.isLoggedIn = action.payload;
    })

    .addCase(setLoginMessage, (state, action) => {
      state.loginMessage = action.payload;
    })

    .addCase(setId, (state, action) => {
      state.id = action.payload;
    })

    .addCase(setEmail, (state, action) => {
      state.email = action.payload;
    })

    .addCase(setPseudo, (state, action) => {
      state.pseudo = action.payload;
    })

    .addCase(setCreatedGames, (state, action) => {
      state.createdGames = action.payload;
    })

    .addCase(setPlayedGames, (state, action) => {
      state.playedGames = action.payload;
    });

});