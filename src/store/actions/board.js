import { createAction } from '@reduxjs/toolkit';

export const initBoard = createAction('board/initBoard');
export const toggleCell = createAction('board/toggleCell');