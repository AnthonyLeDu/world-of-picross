import BoardCluesCell from './BoardCluesCell';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.scss';
import { useSelector } from 'react-redux';
import { getCurrentColumn, getCurrentRow } from '../../store/selectors/game';
import { useEffect, useState } from 'react';

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
        // tableCell.state can be equal to null
        { 'board-clues__line--current': isCurrent },
      )}
    >
    {
      [...Array(content.length)].map((v, i) => (
          <BoardCluesCell
            // eslint-disable-next-line react/no-array-index-key
            key={`cell-${i}`}
            index={i}
            rgba={content[i].rgba}
            count={content[i].count}
          />
        ))
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
  ).isRequired,
  direction: PropTypes.string.isRequired,
};

export default BoardCluesLine;