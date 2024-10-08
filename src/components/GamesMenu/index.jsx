import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAvailableGames } from '../../store/api/app';
import { getAvailableGames } from '../../store/selectors/app';
import GamesMenuCard from './GamesMenuCard';
import { getIsLoggedIn } from '../../store/selectors/user';

function GamesMenu() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const availableGames = useSelector(getAvailableGames);

  useEffect(() => {
    dispatch(fetchAvailableGames());
  }, [dispatch, isLoggedIn]);
  
  // console.log('availableGames:', availableGames);

  return (
    <div className="games-menu">
      {availableGames && (
        availableGames.map((game) => (
          <GamesMenuCard
            key={game.id}
            game={game}
          />
        ))
      )}
    </div>
  );
}

export default GamesMenu;
