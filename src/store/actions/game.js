import { createAction } from '@reduxjs/toolkit';

export const initGameBoard = createAction('game/initGameBoard');
export const setIsLoading = createAction('game/setIsLoading');
export const setIsLoaded = createAction('game/setIsLoaded');
export const toggleCellON = createAction('game/toggleCellON');
export const toggleCellOFF = createAction('game/toggleCellOFF');
export const setCurrentRgba = createAction('game/setCurrentRgba');
export const setCurrentRow = createAction('game/setCurrentRow');
export const setCurrentColumn = createAction('game/setCurrentColumn');
