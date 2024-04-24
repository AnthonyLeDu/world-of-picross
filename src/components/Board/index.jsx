import { useSelector } from 'react-redux';
import { getRowsCount } from '../../store/selectors/board';
import './index.scss';
import BoardRow from './BoardRow';

function Board() {

  const rowsCount = useSelector(getRowsCount);

  return (
    <div className="board">
      {[...Array(rowsCount)].map((v, i) => (
        <BoardRow
          // eslint-disable-next-line react/no-array-index-key
          key={`board-row-${i}`}
          index={i}
        />
      ))}
    </div>
  );
}

export default Board;
