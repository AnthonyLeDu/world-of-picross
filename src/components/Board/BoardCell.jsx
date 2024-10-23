import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  getBoardTableCellState,
  getCurrentPaintingState,
  getCurrentRgba,
} from '../../store/selectors/game';
import {
  setCurrentRow,
  setCurrentColumn,
  setCurrentPaintingState,
  paintCell,
} from '../../store/actions/game';
import './index.scss';
import { useEffect, useState } from 'react';
import { saveGameState } from '../../store/api/game';
import { areEqualRgbas } from '../../utils';

function BoardCell({ rowIndex, columnIndex }) {
  const cellState = useSelector((state) =>
    getBoardTableCellState(state, rowIndex, columnIndex)
  );
  const [cellColor, setCellColor] = useState(null);
  const currentRgba = useSelector(getCurrentRgba);
  const currentPaintingState = useSelector(getCurrentPaintingState);

  const dispatch = useDispatch();

  const paint = () => {
    dispatch(paintCell({ row: rowIndex, column: columnIndex }));
    dispatch(saveGameState());
  };

  const handleMouseDown = (event) => {
    if (event.button !== 0 && event.button !== 2) return;

    event.preventDefault();
    // Determine painting state
    // Left mouse button
    if (event.button === 0) {
      if (
        cellState === null ||
        cellState === false ||
        // replacing with a different color
        !areEqualRgbas(cellState, currentRgba)
      ) {
        // Toggle ON (or replace color)
        dispatch(setCurrentPaintingState(currentRgba));
      } else {
        // Toggle OFF
        dispatch(setCurrentPaintingState(null));
      }
    } else {
      // Right mouse button
      if (cellState === false) {
        dispatch(setCurrentPaintingState(null));
      } else {
        dispatch(setCurrentPaintingState(false));
      }
    }
    paint();
  };

  const handleMouseEnter = (event) => {
    dispatch(setCurrentRow(rowIndex));
    dispatch(setCurrentColumn(columnIndex));

    if (currentPaintingState === undefined) return; // Not painting
    paint();
  };

  useEffect(() => {
    if (cellState) {
      // = is a RGBA array
      setCellColor(
        `rgba(${cellState[0]}, ${cellState[1]}, ${cellState[2]}, ${cellState[3]})`
      );
    } else {
      setCellColor('inherit');
    }
  }, [cellState]);

  return (
    <div
      className={classNames(
        'cell board-cell',
        // cellState can be equal to null
        { 'board-cell--off': cellState === false }
      )}
      style={{ backgroundColor: cellColor }}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
    />
  );
}

BoardCell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
};

export default BoardCell;
