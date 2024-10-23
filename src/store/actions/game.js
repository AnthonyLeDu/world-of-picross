import { createAction } from '@reduxjs/toolkit';

export const initGameBoard = createAction('game/initGameBoard');
export const setIsLoading = createAction('game/setIsLoading');
export const setIsLoaded = createAction('game/setIsLoaded');
export const setGameCurrentContent = createAction('game/setGameCurrentContent');
export const setGameIsCompleted = createAction('game/setGameIsCompleted');
export const setCurrentRgba = createAction('game/setCurrentRgba');
export const setCurrentRow = createAction('game/setCurrentRow');
export const setCurrentColumn = createAction('game/setCurrentColumn');
export const setIsSaving = createAction('game/setIsSaving');
export const setIsSaved = createAction('game/setIsSaved');
export const setIsLeftMouseButtonDown = createAction('game/setIsLeftMouseButtonDown');
export const setIsRightMouseButtonDown = createAction('game/setIsRightMouseButtonDown');
export const setCurrentPaintingState = createAction('game/setCurrentPaintingState');
export const paintCell = createAction('game/paintCell');

