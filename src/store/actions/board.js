import { createAction } from '@reduxjs/toolkit';

export const setBoardIsLoading = createAction('board/setBoardIsLoading');
export const initBoard = createAction('board/initBoard');
export const setBoardName = createAction('board/setBoardName');
export const toggleCellON = createAction('board/toggleCellON');
export const toggleCellOFF = createAction('board/toggleCellOFF');