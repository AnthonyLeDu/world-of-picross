import './Board.css';
import BoardRow from './BoardRow';

function Board() {
  const rowsCount=10;

  return (
    <div className="board">
      {
        [...Array(rowsCount)].map((v, i) => (
          <BoardRow key={`board-row-${i}`} index={i} />
        ))
      }
    </div>
  );
}

export default Board;
