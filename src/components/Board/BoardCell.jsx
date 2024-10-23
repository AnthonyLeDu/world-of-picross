import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  getBoardTableCellState,
  getCurrentRgba,
} from '../../store/selectors/game';
import {
  toggleCellON,
  toggleCellOFF,
  setCurrentRow,
  setCurrentColumn,
} from '../../store/actions/game';
import './index.scss';
import { useEffect, useState } from 'react';
import { saveGameState } from '../../store/api/game';

function BoardCell({ rowIndex, columnIndex }) {
  const cellState = useSelector((state) =>
    getBoardTableCellState(state, rowIndex, columnIndex)
  );
  const [cellColor, setCellColor] = useState(null);
  const currentRgba = useSelector(getCurrentRgba);

  const dispatch = useDispatch();

  const saveToDataBase = () => {
    dispatch(saveGameState());
  };

  const toggleON = () => {
    dispatch(
      toggleCellON({
        row: rowIndex,
        column: columnIndex,
        rgba: currentRgba,
      })
    );
    saveToDataBase();
  };

  const toggleOFF = (e) => {
    e.preventDefault(); // Prevent context menu to open
    dispatch(toggleCellOFF({ row: rowIndex, column: columnIndex }));
    saveToDataBase();
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
      onClick={toggleON}
      onContextMenu={toggleOFF}
      onMouseEnter={() => {
        dispatch(setCurrentRow(rowIndex));
        dispatch(setCurrentColumn(columnIndex));
      }}
    />
  );
}

BoardCell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
};

export default BoardCell;
