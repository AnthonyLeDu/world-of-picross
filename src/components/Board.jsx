import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getColumnsCount, getRowsCount } from '../store/selectors/board';
import './Board.css';
import BoardRow from './BoardRow';

function Board() {

  const rowsCount = useSelector(getRowsCount);
  const columnsCount = useSelector(getColumnsCount);

  useEffect(() => {
    console.log('Rows count = ', rowsCount);
    console.log('Columns count = ', columnsCount);
  }, [rowsCount, columnsCount]);


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
