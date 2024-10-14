import './index.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchGamesSummaries } from '../../store/api/app';
import { getAvailableGames, getIsLoadingGamesSummaries } from '../../store/selectors/app';
import GamesMenuCard from './GamesMenuCard';
import { getIsLoggedIn } from '../../store/selectors/user';

function GamesMenu() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const availableGames = useSelector(getAvailableGames);
  const isLoadingGamesSummaries = useSelector(getIsLoadingGamesSummaries);

  useEffect(() => {
    dispatch(fetchGamesSummaries());
  }, [dispatch, isLoggedIn]);
  
  return (
    <div className="games-menu">
    {isLoadingGamesSummaries && (
      <div>
        Loading games...
      </div>
    )}
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
