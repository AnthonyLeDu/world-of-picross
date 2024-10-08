import PropTypes from 'prop-types';
import './index.scss';
import { setCurrentGameId } from '../../store/actions/app';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentGameId } from '../../store/selectors/app';
import Game from '../../models/game';
import { getUserId } from '../../store/selectors/user';
import classNames from 'classnames';


function GamesMenuCard({ game }) {

  const dispatch = useDispatch();
  const currentGameId = useSelector(getCurrentGameId);
  const userId = useSelector(getUserId);

  const handleClick = () => {
    dispatch(setCurrentGameId(game.id));
  };

  const isValidContent = game.isValidContent();
  const clickHandler = isValidContent ? handleClick : null;

  return (
    <div className={classNames(
      'games-menu-card',
      {'games-menu-card--current': currentGameId === game.id},
      {'games-menu-card--user-is-creator': userId === game.creator_id},
      {'games-menu-card--invalid': !isValidContent}
    )

    } onClick={clickHandler}>
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
