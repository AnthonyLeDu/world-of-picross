import './BoardRow.css';
import BoardCell from './BoardCell';

function BoardRow({ index }) {
  const colCount = 10;

  return (
    <div className="board-row">
      {
        [...Array(colCount)].map((v, i) => (
          <BoardCell key={`board-cell-${index}-${i}`} />
        ))
      }
    </div>
  );
}

export default BoardRow;
