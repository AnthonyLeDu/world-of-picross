import BoardCluesCell from './BoardCluesCell';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';
import { useSelector } from 'react-redux';
import { getCurrentColumn, getCurrentRow } from '../../store/selectors/game';
import { useEffect, useState } from 'react';
import EmptyBoardCluesCell from './EmptyBoardCluesCell';

function BoardCluesLine({index, content, direction}) {
  const currentRow = useSelector(getCurrentRow);
  const currentColumn = useSelector(getCurrentColumn);
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    setIsCurrent(
      (direction === 'rows' && currentRow === index)
      || (direction === 'columns' && currentColumn === index)
    );
  }, [index, currentRow, currentColumn, direction]);

  return (
    <div
      className={classNames(
        'board-clues__line',
        { 'board-clues__line--current': isCurrent },
      )}
    >
    { content === null ? <EmptyBoardCluesCell /> : (
      [...Array(content.length)].map((_, i) => (
          <BoardCluesCell
            // eslint-disable-next-line react/no-array-index-key
            key={`cell-${i}`}
            index={i}
            rgba={content[i].rgba}
            count={content[i].count}
          />
        ))
    )
    }
    </div>
  );
}

BoardCluesLine.propTypes = {
  index: PropTypes.number.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape(
      BoardCluesCell.propTypes
    )
  ),
  direction: PropTypes.string.isRequired,
};

export default BoardCluesLine;
