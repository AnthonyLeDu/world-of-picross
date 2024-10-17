import './Game.scss';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import BoardClues from './BoardClues';
import Board from './Board';
import { useSelector } from 'react-redux';
import {
  getBoardClues,
  getCompletion,
  getGameName,
  getCurrentRgba,
  getCurrentRow,
  getCurrentColumn,
  getIsLoaded,
} from '../store/selectors/game';
import { getCurrentGameId } from '../store/selectors/app';
import { initGameBoard } from '../store/actions/game';
import { rgbaStringFromArray } from '../utils';
import { fetchGame } from '../store/api/game';

function Game() {
  const isLoaded = useSelector(getIsLoaded);
  const boardName = useSelector(getGameName);
  const boardClues = useSelector(getBoardClues);
  const completion = useSelector(getCompletion);
  const currentGameId = useSelector(getCurrentGameId);
  const currentRgba = useSelector(getCurrentRgba);
  const currentRow = useSelector(getCurrentRow);
  const currentColumn = useSelector(getCurrentColumn);
  const dispatch = useDispatch();

  const [gameId, setGameId] = useState(undefined);

  useEffect(() => {
    if (isLoaded) {
      dispatch(initGameBoard(gameId));
    }
  }, [dispatch, gameId, isLoaded]);

  useEffect(() => {
    if (currentGameId !== gameId) {
      setGameId(currentGameId);
      dispatch(fetchGame(currentGameId));
    }
  }, [dispatch, currentGameId, gameId]);

  return (
    <div className="game">
      {isLoaded && currentGameId && (
        <>
          <p>Left click : Toggle ON | Right-click : Toggle OFF</p>
          <p>Click on clues to change color.</p>
          <div className="game-color">
            <p>Current color :</p>
            <div
              className="game-color__square"
              style={{ backgroundColor: rgbaStringFromArray(currentRgba) }}
            />
          </div>
          <p>
            Current row: {currentRow || '-'} | Current column:{' '}
            {currentColumn || '-'}
          </p>

          <h1>{boardName}</h1>

          {boardClues && (
            <>
              <div className="game-upper">
                <BoardClues direction="columns" content={boardClues[1]} />
              </div>

              <div className="game-lower">
                <BoardClues direction="rows" content={boardClues[0]} />
                <Board />
              </div>

              <p>Completion : {(completion * 100).toFixed(0)} %</p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Game;
