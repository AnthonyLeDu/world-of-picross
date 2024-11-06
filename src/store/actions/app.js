import { createAction } from '@reduxjs/toolkit';

export const setCurrentAuthForm = createAction('app/setCurrentAuthForm');
export const setCurrentGameId = createAction('app/setCurrentGameId');
export const setIsLoadingGamesSummaries = createAction('app/setIsLoadingGamesSummaries');
export const setAvailableGamesIds = createAction('app/setAvailableGamesIds');