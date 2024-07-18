import { useSelector } from 'react-redux';
import './index.scss';
import { getAvailableGames } from '../../store/selectors/app';
import GamesMenuCard from './GamesMenuCard';

function GamesMenu() {
  
  const availableGames = useSelector(getAvailableGames);
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
