import { API_URL } from './_env';
import { setAvailableGamesIds, setIsLoadingGames } from '../actions/app';
import {newGame} from '../../models/game';


export const fetchAvailableGames = () => async (dispatch) => {
  dispatch(setIsLoadingGames(true));
  const response = await fetch(`${API_URL}/games`);
  const data = await response.json();
  // Create the Game instance on the fly and store its ID
  dispatch(setAvailableGamesIds(data.map((g) => newGame(g).id)));
  dispatch(setIsLoadingGames(false));
};
