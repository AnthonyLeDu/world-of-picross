import { API_URL } from './_env';
import {
  setId,
  setIsLoggedIn,
  setIsLoggingIn,
  setLoginMessage,
  setEmail,
  setPseudo,
} from '../actions/user';
import { toast } from 'react-toastify';

const getRequestInit = {
  method: 'GET',
  credentials: 'include', // Ensure cookies are sent
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
        username: formData.get('email'), // OAuth2 expects a 'username' key
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

  dispatch(setLoginMessage(''));
  if (response.ok) {
    dispatch(setIsLoggedIn(true));
  } else {
    dispatch(setIsLoggedIn(false));
    dispatch(
      setLoginMessage(
        "Failed to log in. Verify your credentials or register if you don't have any account yet."
      )
    );
  }
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
  dispatch(setLoginMessage(''));
  const response = await fetch(`${API_URL}/logout`, getRequestInit);
  if (response.ok) {
    dispatch(setIsLoggedIn(false));
  } else {
    dispatch(setLoginMessage('Failed to log out. Please retry.'));
  }
};

export const getUserProfile = () => async (dispatch) => {
  const response = await fetch(`${API_URL}/user/me`, getRequestInit);
  if (response.ok) {
    const userData = await response.json();
    dispatch(setId(userData.id));
    dispatch(setEmail(userData.email));
    dispatch(setPseudo(userData.pseudo));
  } else {
    dispatch(setPseudo(undefined));
  }
};
