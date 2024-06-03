import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { getAvailableGames } from '../../store/selectors/app';
import GamesMenuCard from './GamesMenuCard';

function GamesMenu() {

  const availableGames = useSelector(getAvailableGames);
  // const dispatch = useDispatch();
  console.log(availableGames);

  return (
    <div className="games-menu">
      {availableGames && (
        availableGames.map((game) => (
          <GamesMenuCard
            key={game.name}
            game={game}
          />
        ))
      )}
    </div>
  );
}

export default GamesMenu;
