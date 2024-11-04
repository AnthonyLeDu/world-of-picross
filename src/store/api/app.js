import { API_URL } from './_env';
import {
  setAvailableGamesIds,
  setIsLoadingGamesSummaries,
} from '../actions/app';
import { newGame } from '../../models/game';

export const fetchGamesSummaries = () => async (dispatch, getState) => {
  try {
    dispatch(setIsLoadingGamesSummaries(true));

    const gamesResponse = await fetch(`${API_URL}/games`);
    if (!gamesResponse.ok) {
      throw new Error('Games summaries loading failed!');
    }

    const gamesData = await gamesResponse.json();
    const state = getState();

    // If user is logged in, get the completion states
    let gamesDataWithCompletion = gamesData;
    if (state.user.isLoggedIn) {
      const gameStatesResponse = await fetch(`${API_URL}/gamestatescompletion`);
      if (!gameStatesResponse.ok) {
        console.error('Game states loading failed!');
      } else {
        const gameStatesData = await gameStatesResponse.json();

        const completions = gameStatesData.reduce(
          (states, { game_id, is_completed }) => {
            states[game_id] = is_completed;
            return states;
          },
          {}
        );

        // Merge completion data with games data
        gamesDataWithCompletion = gamesData.map((game) => ({
          ...game,
          is_completed: completions[game.id] ?? false,
        }));
      }
    }
    // Dispatch the available games' IDs
    const gameIds = gamesDataWithCompletion.map((game) => newGame(game).id);
    dispatch(setAvailableGamesIds(gameIds));
  } catch (error) {
    console.error(error.message);
  } finally {
    dispatch(setIsLoadingGamesSummaries(false));
  }
};
