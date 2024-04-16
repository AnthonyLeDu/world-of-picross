import { initBoard } from '../actions/board';

const validateBoardData = (data) => {
  if (data.content === undefined) throw new Error(`'${data.name}' board has no content data.`);
  if (data.content.length === 0 || data.content[0].length === 0) throw new Error(`'${data.name}' board content data is empty.`);
  if (data.content.filter((row) => row.length !== data.content[0].length).length > 0) {
    throw new Error(`'${data.name}' board table rows are of uneven length.`);
  }
};

export const fetchAndInitBoard = (name) => async (dispatch) => {
  fetch(`data/boards/${name}.json`)
    .then((response) => response.json()
      .then((data) => {
        data.name = name;
        validateBoardData(data);
        data.rowsCount = data.content.length;
        data.columnsCount = data.content[0].length;
        // Validate all rows have the same amount of columns as row 0
        dispatch(initBoard(data));
      }))
    .catch((error) => console.error(`Error while fetching '${name}' board data: ${error}`));
};
