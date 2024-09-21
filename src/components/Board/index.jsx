import { useDispatch, useSelector } from 'react-redux';
import { getBoardRowsCount } from '../../store/selectors/game';
import './index.scss';
import BoardRow from './BoardRow';
import { setCurrentColumn, setCurrentRow } from '../../store/actions/game';

function Board() {
  const dispatch = useDispatch();
  const rowsCount = useSelector(getBoardRowsCount);

  return (
    <div
      className="board"
      onMouseLeave={() => {
        dispatch(setCurrentRow(undefined));
        dispatch(setCurrentColumn(undefined));
      }}
    >
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
