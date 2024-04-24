import './Game.scss';
import BoardClues from './Board/BoardClues/BoardClues';
import { HORIZONTAL, VERTICAL } from '../utils/Constants';
import Board from './Board';
import { useSelector } from 'react-redux';
import { getTableCompletion, getTableName } from '../store/selectors/board';

function Game() {

  const boardName = useSelector(getTableName);
  const tableCompletion = useSelector(getTableCompletion) * 100.0;
  
  return (
    <div className="game">
      <h1>{boardName}</h1>
      <p>Left click : Toggle ON | Right-click : Toggle OFF</p>
      
      <div className='game-upper'>
        <BoardClues
          direction={HORIZONTAL}
          content={[[1, 2, 1], [1, 2, 1], [1, 2, 1], [1, 2, 1], [1, 2, 1]]}
        />
      </div>
      
      <div className="game-lower">
        <BoardClues
          direction={VERTICAL}
          content={[[1, 2, 1], [1, 2, 1], [1, 2, 1], [1, 2, 1], [1, 2, 1], [1, 2, 1], [1, 2, 1]]}
        />
        <Board />
      </div>
      
      <p>Completion : {tableCompletion.toFixed(0)} %</p>

    </div>
  );
}

export default Game;
