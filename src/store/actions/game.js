import { createAction } from '@reduxjs/toolkit';

export const setGameIsLoading = createAction('game/setGameIsLoading');
export const initGameBoard = createAction('game/initGameBoard');
export const toggleCellON = createAction('game/toggleCellON');
export const toggleCellOFF = createAction('game/toggleCellOFF');