import { useSelector } from 'react-redux';
import './index.scss';
import PropTypes from 'prop-types';
import { getBoardColumnsCount, getBoardRowsCount } from '../../store/selectors/game';
import BoardCluesLine from './BoardCluesLine';

function BoardClues({ direction, content }) {

  const rowsCount = useSelector(getBoardRowsCount);
  const columnsCount = useSelector(getBoardColumnsCount);
  const itemsCount = direction === 'rows' ? rowsCount : columnsCount;

  return (
    <div className={`board-clues board-clues--${direction}`}>
      {
        [...Array(itemsCount)].map((v, i) => (
          <BoardCluesLine
            // eslint-disable-next-line react/no-array-index-key
            key={`board-clues-${direction}-item-${i}`}
            direction={direction}
            index={i}
            content={content[i]}
          />
        ))
      }
    </div>
  );
}

BoardClues.propTypes = {
  direction: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
};

export default BoardClues;
