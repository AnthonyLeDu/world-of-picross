import { API_URL } from './_env';
import { setAvailableGamesIds, setIsLoadingGamesSummaries} from '../actions/app';
import { newGame } from '../../models/game';


export const fetchGamesSummaries = () => async (dispatch) => {
  dispatch(setIsLoadingGamesSummaries(true));
  const response = await fetch(`${API_URL}/games`);
  const data = await response.json();
  // Create the Game instance on the fly and store its ID
  dispatch(setAvailableGamesIds(data.map((g) => newGame(g).id)));
  dispatch(setIsLoadingGamesSummaries(false));
};
