import PropTypes from 'prop-types';
import './index.scss';
import { setCurrentGameId } from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentGameId } from '../../store/selectors/app';
import Game from '../../models/game';


function GamesMenuCard({ game }) {

  const dispatch = useDispatch();
  const currentGameId = useSelector(getCurrentGameId);

  const handleClick = () => {
    dispatch(setCurrentGameId(game.id));
  };

  const isValidContent = game.isValidContent();
  const clickHandler = isValidContent ? handleClick : null;

  let className = 'games-menu-card';
  if (currentGameId === game.id) className += ' games-menu-card--current';
  if (!isValidContent) className += ' games-menu-card--invalid';

  return (
    <div className={className} onClick={clickHandler}>
      <h3 className="games-menu-card__title">{game.name}</h3>
      {isValidContent ? (
        <>
          <p>{`${game.getRowsCount()}x${game.getColumnsCount()}`}</p>
          <p>Dif. {game.difficulty}</p>
        </>
      ) : (
        <p>Invalid content</p>
      )
      }
    </div>
  );
}

GamesMenuCard.propTypes = {
  game: PropTypes.instanceOf(Game)
};

export default GamesMenuCard;
