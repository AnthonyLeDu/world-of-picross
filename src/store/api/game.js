import { API_URL } from './_env';
import { getGame, updateGame } from '../../models/game';
import {
  setGameCurrentContent,
  setIsLoaded,
  setIsLoading,
  setIsSaved,
  setIsSaving,
  setGameIsCompleted,
  setGameLastSavedContent,
  initGameBoard,
} from '../actions/game';
import { toast } from 'react-toastify';

export const fetchGame = (id) => async (dispatch) => {
  dispatch(setIsLoading(true)); // This also set isLoaded to false
  const gameResponse = await fetch(`${API_URL}/game/${id}`);
  if (!gameResponse.ok) {
    dispatch(setIsLoading(false));
    return; // isLoaded will remain false
  }
  const gameData = await gameResponse.json();
  updateGame(id, gameData);
  dispatch(initGameBoard(id));
  dispatch(setIsLoading(false));
  dispatch(setIsLoaded(true));
  dispatch(fetchGameState(id));
};

export const fetchGameState = (id) => async (dispatch) => {
  // Get gamestate (if user has a saved state for this game)
  const gameStateResponse = await fetch(`${API_URL}/gamestate/${id}`);
  if (gameStateResponse.ok) {
    // Authenticated, gamestate found
    const stateData = await gameStateResponse.json();
    dispatch(setGameCurrentContent(stateData.current_content));
    dispatch(setGameLastSavedContent(stateData.current_content));
    dispatch(setGameIsCompleted(stateData.is_completed));
    // Make sure the GameCard will be updated
    getGame(id).is_completed = stateData.is_completed;
  }
};

export const saveGameState = () => async (dispatch, getState) => {
  const state = getState();

  // If user is not authenticated, don't attempt to save
  if (!state.user.isLoggedIn) {
    dispatch(setIsSaved(false));
    return;
  }

  // If content has not changed, don't save
  if (state.game.currentContent === state.game.lastSavedContent) {
    dispatch(setIsSaved(true));
    return;
  }

  const gameId = state.game.id;
  const gameState = {
    current_content: state.game.currentContent,
  };

  const genericFetch = async (method) => {
    const response = await toast.promise(
      fetch(`${API_URL}/gamestate/${gameId}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameState),
      }),
      {
        pending: 'Saving...',
        success: 'Game saved!',
        error: 'Save failed!',
      }
    );
    if (response.ok) {
      const gameStateResponse = await response.json();
      getGame(gameId).is_completed = gameStateResponse.is_completed;
      dispatch(setGameLastSavedContent(gameStateResponse.current_content));
      dispatch(setGameCurrentContent(gameStateResponse.current_content));
      dispatch(setGameIsCompleted(gameStateResponse.is_completed));
      dispatch(setIsSaving(false));
      dispatch(setIsSaved(true));
      return true;
    }
    return response;
  };

  dispatch(setIsSaving(true));
  const response = await genericFetch('PUT');
  if (response === true) return; // Sucessfull

  if (response.status === 404) {
    // Maybe it's the first save attempt, try a POST
    const response2 = await genericFetch('POST');
    if (response2 === true) return; // Sucessfull
  }

  dispatch(setIsSaving(false));
};
