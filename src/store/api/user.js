import { API_URL } from './_env';
import { setIsLoggedIn, setIsLoggingIn, setLoginMessage, setPseudo } from '../actions/user';


export const logUserIn = (formData) => async (dispatch) => {
  dispatch(setIsLoggingIn(true));
  const response = await fetch(
    `${API_URL}/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'username': formData.get('email'),  // OAuth2 expects a 'username' key
        'password': formData.get('password'),
      }),
    });
  dispatch(setIsLoggingIn(false));
  if (response.ok) {
    console.log('Login successful!');
    dispatch(getUserProfile());
    dispatch(setIsLoggedIn(true));
    dispatch(setLoginMessage('Connected'));
  } else {
    dispatch(setIsLoggedIn(false));
    dispatch(setLoginMessage('Failed to log in. Verify your credentials or register if you don\'t have any account yet'));
  }
};


export const getUserProfile = () => async (dispatch) => {
  const response = await fetch(
    `${API_URL}/user/me`,
    {
      method: 'GET',
      credentials: 'include',  // Ensure cookies are sent
    }
  );
  if (response.ok) {
    const userData = await response.json();
    dispatch(setPseudo(userData.pseudo));
    console.log(userData);
  } else {
  }
};