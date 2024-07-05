import { API_URL } from './_env';
import { setAvailableGames, setIsLoadingGames } from '../actions/app';

export const fetchAvailableGames = () => async (dispatch) => {
  dispatch(setIsLoadingGames(true));
  const response = await fetch(`${API_URL}/games`);
  const games = await response.json();
  dispatch(setAvailableGames(games));
  dispatch(setIsLoadingGames(false));
};
