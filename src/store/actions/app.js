import { createAction } from '@reduxjs/toolkit';

export const setCurrentGame = createAction('app/setCurrentGame');
export const setIsLoadingGames = createAction('app/setIsLoadingGames');
export const setAvailableGames = createAction('app/setAvailableGames');