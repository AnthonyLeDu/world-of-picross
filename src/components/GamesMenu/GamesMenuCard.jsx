import PropTypes from 'prop-types';
import './index.scss';
import { setCurrentGameId } from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentGameId } from '../../store/selectors/app';
import Game from '../../models/game';
import { getUserId } from '../../store/selectors/user';
import classNames from 'classnames';
import { setIsLoaded } from '../../store/actions/game';


function GamesMenuCard({ game }) {

  const dispatch = useDispatch();
  const currentGameId = useSelector(getCurrentGameId);
  const userId = useSelector(getUserId);

  const handleClick = () => {
    dispatch(setIsLoaded(false));
    dispatch(setCurrentGameId(game.id));
  };


  return (
    <div className={classNames(
      'games-menu-card',
      { 'games-menu-card--current': currentGameId === game.id },
      { 'games-menu-card--user-is-creator': userId === game.creator_id },
    )

    } onClick={handleClick}>
      <h3 className="games-menu-card__title">{game.name}</h3>
      <p>{`${game.rows_count}x${game.columns_count}`}</p>
      <p>Dif. {game.difficulty}</p>
    </div>
  );
}

GamesMenuCard.propTypes = {
  game: PropTypes.instanceOf(Game)
};

export default GamesMenuCard;
