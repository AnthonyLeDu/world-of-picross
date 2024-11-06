import { API_URL } from './_env';
import {
  setId,
  setIsLoggedIn,
  setIsLoggingIn,
  setAuthMessage,
  setUserName,
  setPseudo,
} from '../actions/user';
import { toast } from 'react-toastify';

// TODO: delete this (useless ?) ?
const getRequestInit = {
  method: 'GET',
  credentials: 'include', // Ensure cookies are sent
};

export const registerWithCredentials = (formData) => async (dispatch) => {
  dispatch(setIsLoggingIn(true));
  const response = await toast.promise(
    fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(formData),
    }),
    {
      pending: 'Registering...',
      success: 'Registered!',
      error: 'Registering failed!',
    }
  );
  console.log(response);
  
  dispatch(setIsLoggingIn(false));
  dispatch(setAuthMessage(''));
  if (response.ok) {
    dispatch(setAuthMessage('Registering successful, please log in.'));
    return;
  }
  const json = await response.json();
  console.log(json);
  
  const reason = json?.detail ?? 'unknown';
  dispatch(setAuthMessage(`Failed to register: ${reason}.`));
};

export const loginWithCredentials = (formData) => async (dispatch) => {
  dispatch(setIsLoggingIn(true));
  const response = await toast.promise(
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username: formData.get('username'),
        password: formData.get('password'),
      }),
    }),
    {
      pending: 'Authenticating...',
      success: 'You are logged in!',
      error: 'Login failed!',
    }
  );
  dispatch(setIsLoggingIn(false));

  dispatch(setAuthMessage(''));
  if (response.ok) {
    dispatch(setIsLoggedIn(true));
    return;
  }
  dispatch(setIsLoggedIn(false));
  dispatch(
    setAuthMessage(
      "Failed to log in. Verify your credentials or register if you don't have any account yet."
    )
  );
};

export const loginWithCookie = () => async (dispatch) => {
  dispatch(setIsLoggingIn(true));
  const response = await fetch(`${API_URL}/login`, getRequestInit);
  dispatch(setIsLoggingIn(false));
  if (response.ok) {
    dispatch(setIsLoggedIn(true));
  } else {
    dispatch(setIsLoggedIn(false));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setAuthMessage(''));
  const response = await fetch(`${API_URL}/logout`, getRequestInit);
  if (response.ok) {
    dispatch(setIsLoggedIn(false));
  } else {
    dispatch(setAuthMessage('Failed to log out. Please retry.'));
  }
};

export const getUserProfile = () => async (dispatch) => {
  const response = await fetch(`${API_URL}/user/me`, getRequestInit);
  if (response.ok) {
    const userData = await response.json();
    dispatch(setId(userData.id));
    dispatch(setUserName(userData.username));
    dispatch(setPseudo(userData.pseudo));
  } else {
    dispatch(setPseudo(undefined));
  }
};
