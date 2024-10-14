import { API_URL } from './_env';
import { updateGame } from '../../models/game';
import { setIsLoaded, setIsLoading } from '../actions/game';


export const fetchGame = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));  // This also set isLoaded to false
  const response = await fetch(`${API_URL}/game/${id}`);
  dispatch(setIsLoading(false));
  if (!response.ok) return;  // isLoaded will remain false
  const data = await response.json();
  updateGame(id, data);
  dispatch(setIsLoaded(true));
};