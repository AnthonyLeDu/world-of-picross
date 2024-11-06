import { createAction } from '@reduxjs/toolkit';

export const setIsLoggedIn = createAction('user/setIsLoggedIn');
export const setIsLoggingIn = createAction('user/setIsLoggingIn');
export const setLoginMessage = createAction('user/setLoginMessage');
export const setId = createAction('user/setId');
export const setUserName = createAction('user/setUserName');
export const setPseudo = createAction('user/setPseudo');
export const setCreatedGames = createAction('user/setCreatedGames');
export const setPlayedGames = createAction('user/setPlayedGames');
