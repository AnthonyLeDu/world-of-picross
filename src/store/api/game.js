import { API_URL } from './_env';
import { initGameBoard, setGameIsLoading } from '../actions/game';

const validateBoardData = (data) => {
  if (data.content === undefined) throw new Error(`'${data.name}' board has no content data.`);
  if (data.content.length === 0 || data.content[0].length === 0) throw new Error(`'${data.name}' board content data is empty.`);
  if (data.content.filter((row) => row.length !== data.content[0].length).length > 0) {
    throw new Error(`'${data.name}' board table rows are of uneven length.`);
  }
};

export const fetchAndInitBoard = (name) => async (dispatch) => {
  dispatch(setGameIsLoading(true));
  const response = await fetch(`${API_URL}/game/${name}`);
  const data = await response.json();
  validateBoardData(data);
  dispatch(initGameBoard(data));
  dispatch(setGameIsLoading(false));
};
