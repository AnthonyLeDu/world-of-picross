import './Game.scss';
import BoardClues from './Board/BoardClues/BoardClues';
import Board from './Board';
import { useSelector } from 'react-redux';
import { getBoardClues, getBoardCompletion, getBoardIsLoading, getBoardName } from '../store/selectors/board';

function Game() {

  const boardIsLoading = useSelector(getBoardIsLoading);
  const boardName = useSelector(getBoardName);
  const boardClues = useSelector(getBoardClues);
  const boardCompletion = useSelector(getBoardCompletion);

  return (
    <div className="game">
      <p>Left click : Toggle ON | Right-click : Toggle OFF</p>

      {!boardIsLoading && 
        <>
          <h1>{boardName}</h1>

          <div className='game-upper'>
            <BoardClues
              direction='columns'
              content={boardClues['columns']}
            />
          </div>

          <div className="game-lower">
            <BoardClues
              direction='rows'
              content={boardClues['rows']}
            />
            <Board />
          </div>

          <p>Completion : {(boardCompletion * 100).toFixed(0)} %</p>
        </>
      }

    </div>
  );
}

export default Game;
