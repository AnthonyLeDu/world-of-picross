import PropTypes from 'prop-types';
import './index.scss';
import { setCurrentGame } from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentGame } from '../../store/selectors/app';

function GamesMenuCard({ game }) {
  
  const dispatch = useDispatch();
  const currentGame = useSelector(getCurrentGame);

  const handleClick = () => {
     dispatch(setCurrentGame(game.id));
  };

  const className = 'games-menu-card' + (currentGame === game.name ? ' games-menu-card--current' : '');
  
  return (
    <div className={className} onClick={handleClick}>
      <h3 className="games-menu-card__title">{game.name}</h3>
      <p>{`${game.rowsCount}x${game.colsCount}`}</p>
      <p>Dif. {game.difficulty}</p>
    </div>
  );
}

GamesMenuCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rowsCount: PropTypes.number.isRequired,
    colsCount: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
  })
};

export default GamesMenuCard;
