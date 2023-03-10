import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getRowsCount } from '../store/selectors/board';
import './Board.css';
import BoardRow from './BoardRow';

function Board() {
  const rowsCount = useSelector(getRowsCount);

  useEffect(() => {
  }, [rowsCount]);

  return (
    <div className="board">
      {
        [...Array(rowsCount)].map((v, i) => (
          <BoardRow
            // eslint-disable-next-line react/no-array-index-key
            key={`board-row-${i}`}
            index={i}
          />
        ))
      }
    </div>
  );
}

export default Board;
