import { createReducer } from '@reduxjs/toolkit';
import { setIsLoggedIn, setIsLoggingIn, setLoginMessage } from '../actions/user';


// Initial state
const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  loginMessage: ''
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
    });

});