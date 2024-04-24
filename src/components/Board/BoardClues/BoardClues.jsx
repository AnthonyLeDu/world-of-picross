import { useSelector } from 'react-redux';
import './index.scss';
import PropTypes from 'prop-types';
import { getColumnsCount, getRowsCount } from '../../../store/selectors/board';
import {VERTICAL} from '../../../utils/Constants';
import BoardCluesRow from './BoardCluesRow';
// import { useMemo } from 'react';

function BoardClues({direction, content}) {

  const rowsCount = useSelector(getRowsCount);
  const columnsCount = useSelector(getColumnsCount);
  const itemsCount = direction === VERTICAL ? rowsCount : columnsCount;

  return (
    <div className={`board-clues board-clues--${direction}`}>
    {
      [...Array(itemsCount)].map((v, i) => (
          <BoardCluesRow
            // eslint-disable-next-line react/no-array-index-key
            key={`board-clues-${direction}-item-${i}`}
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
  content: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ).isRequired,
};

export default BoardClues;
