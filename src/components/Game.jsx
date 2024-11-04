import './Game.scss';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import BoardClues from './BoardClues';
import Board from './Board';
import { useSelector } from 'react-redux';
import {
  getBoardClues,
  getGameIsCompleted,
  getGameName,
  getCurrentRgba,
  // getCurrentRow,
  // getCurrentColumn,
  getIsLoaded,
} from '../store/selectors/game';
import { getCurrentGameId } from '../store/selectors/app';
import {
  setIsLeftMouseButtonDown,
  setIsRightMouseButtonDown,
} from '../store/actions/game';
import { rgbaStringFromArray } from '../utils';
import { fetchGame, saveGameState } from '../store/api/game';

function Game() {
  const isLoaded = useSelector(getIsLoaded);
  const boardName = useSelector(getGameName);
  const boardClues = useSelector(getBoardClues);
  const isCompleted = useSelector(getGameIsCompleted);
  const currentGameId = useSelector(getCurrentGameId);
  const currentRgba = useSelector(getCurrentRgba);
  // const currentRow = useSelector(getCurrentRow);
  // const currentColumn = useSelector(getCurrentColumn);

  const dispatch = useDispatch();

  const handleMouseUp = (event) => {
    event.preventDefault();
    if (event.button === 0) {
      // Left mouse button
      dispatch(setIsLeftMouseButtonDown(false));
    } else if (event.button === 2) {
      // Right mouse button
      dispatch(setIsRightMouseButtonDown(false));
    }
    dispatch(saveGameState());
  };
  
  const handleMouseLeave = () => {
    dispatch(setIsLeftMouseButtonDown(false));
    dispatch(setIsRightMouseButtonDown(false));
    dispatch(saveGameState());
  };

  const [gameId, setGameId] = useState(undefined);

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
          {/* <p>
            Current row: {currentRow || '-'} | Current column:{' '}
            {currentColumn || '-'}
          </p> */}

          <h1>{boardName}</h1>

          {boardClues && (
            <div
              className="game-area"
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onContextMenu={(event) => {event.preventDefault();}}
            >
              <div className="game-area-upper">
                <BoardClues direction="columns" content={boardClues[1]} />
              </div>

              <div className="game-area-lower">
                <BoardClues direction="rows" content={boardClues[0]} />
                <Board />
              </div>

              <div className="game-area-completion">
                {isCompleted && <p>Game completed!</p>}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Game;
