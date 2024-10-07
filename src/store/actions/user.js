import { createAction } from '@reduxjs/toolkit';

export const setIsLoggedIn = createAction('user/setIsLoggedIn');
export const setIsLoggingIn = createAction('user/setIsLoggingIn');
export const setLoginMessage = createAction('user/setLoginMessage');
export const setPseudo = createAction('user/setPseudo');
