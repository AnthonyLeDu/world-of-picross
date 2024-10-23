import { API_URL } from './_env';
import { updateGame } from '../../models/game';
import {
  setGameCurrentContent,
  setIsLoaded,
  setIsLoading,
  setIsSaved,
  setIsSaving,
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
  
  // Get gamestate (if user has a saved state for this game)
  const gameStateResponse = await fetch(`${API_URL}/gamestate/${id}`);
  dispatch(setIsLoaded(true));
  dispatch(setIsLoading(false));
  // Not authenticated, no gamestate found...
  if (!gameStateResponse.ok) {
    return; // isLoaded will remain false
  }
  const stateData = await gameStateResponse.json();
  dispatch(setGameCurrentContent(stateData.current_content));
};

export const saveGameState = () => async (dispatch, getState) => {
  // TODO: Pending, success and error messages (toastify). Need to move this in the reducer ? (https://stackoverflow.com/questions/72017203/react-toastify-with-redux-from-axios-api)
  const state = getState();
  
  // If user is not authenticated, don't attempt to save
  if (!state.user.isLoggedIn) {
    dispatch(setIsSaved(false));
    return;
  };

  const gameId = state.game.id;
  const gameState = {
    is_completed: state.game.completion === 1.0,
    current_content: state.game.currentContent
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
