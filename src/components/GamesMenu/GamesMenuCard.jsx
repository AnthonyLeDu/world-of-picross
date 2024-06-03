import PropTypes from 'prop-types';
import './index.scss';
import { setCurrentGame } from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentGame } from '../../store/selectors/app';
import { useEffect } from 'react';

function GamesMenuCard({ game }) {
  
  const dispatch = useDispatch();
  const currentGame = useSelector(getCurrentGame);

  const handleClick = () => {
     dispatch(setCurrentGame(game.name));
  };

  const className = 'games-menu-card' + (currentGame === game.name ? ' games-menu-card--current' : '');
  
  return (
    <div className={className} onClick={handleClick}>
      <h3 className="games-menu-card__title">{game.name}</h3>
      <p>{`${game.rowCount}x${game.colCount}`}</p>
      <p>Dif. {game.difficulty}</p>
    </div>
  );
}

GamesMenuCard.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    colCount: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
  })
};

export default GamesMenuCard;
