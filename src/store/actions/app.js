import { createAction } from '@reduxjs/toolkit';

export const setCurrentGameId = createAction('app/setCurrentGameId');
export const setIsLoadingGames = createAction('app/setIsLoadingGames');
export const setAvailableGamesIds = createAction('app/setAvailableGamesIds');