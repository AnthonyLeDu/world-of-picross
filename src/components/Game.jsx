import './Game.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import BoardClues from './BoardClues';
import Board from './Board';
import { useSelector } from 'react-redux';
import { getBoardClues, getCompletion, getGameIsLoading, getGameName } from '../store/selectors/game';
import { getCurrentGame } from '../store/selectors/app';
import { fetchAndInitBoard } from '../store/api/game';


function Game() {

  const boardIsLoading = useSelector(getGameIsLoading);
  const boardName = useSelector(getGameName);
  const boardClues = useSelector(getBoardClues);
  const boardCompletion = useSelector(getCompletion);
  const currentGame = useSelector(getCurrentGame);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(currentGame);
    if (currentGame) {
      dispatch(fetchAndInitBoard(currentGame));
    }
  }, [dispatch, currentGame]);

  return (
    <div className="game">
      {currentGame &&
        <>
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
        </>
      }
    </div>
  );
}

export default Game;
