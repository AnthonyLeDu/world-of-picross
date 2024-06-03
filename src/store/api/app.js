import { setAvailableGames, setIsLoadingGames } from '../actions/app';

export const fetchAvailableGames = () => async (dispatch) => {
  console.log('AAAAAAA');
  dispatch(setIsLoadingGames(true));
  Promise.all(
    ['A', 'B'].map((name) => (
      fetch(`data/games/${name}.json`)
      .then((response) => response.json()
      .then((data) => {
        data.name = name;
        return data;
      }))
      .catch((error) => console.error(`Error while fetching '${name}' game: ${error}`))
    ))
  )
  .then((games) => {
    dispatch(setAvailableGames(games));
    console.log('GAMES=', games);
  })
  .catch((error) => console.error(error));
  dispatch(setIsLoadingGames(false));
};
