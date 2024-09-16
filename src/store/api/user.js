import { API_URL } from './_env';
import { setIsLoggedIn, setIsLoggingIn, setLoginMessage } from '../actions/user';


export const logUserIn = (formData) => async (dispatch) => {
  dispatch(setIsLoggingIn(true));
  const response = await fetch(
    `${API_URL}/user/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  // console.log(response);
  dispatch(setIsLoggingIn(false));
  if (response.ok) {
    dispatch(setIsLoggedIn(true));
    dispatch(setLoginMessage('Connected'));
    const userData = await response.json();
    console.log(userData);
  } else {
    dispatch(setIsLoggedIn(false));
    dispatch(setLoginMessage('Failed to log in. Verify your credentials or register if you don\'t have an account yet'));
  }
};
