import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getBoardTableCell } from '../../store/selectors/game';
import { toggleCellON, toggleCellOFF } from '../../store/actions/game';
import './index.scss';
import { useEffect, useState } from 'react';

function BoardCell({ rowIndex, columnIndex }) {
  const dispatch = useDispatch();
  const tableCell = useSelector((state) => getBoardTableCell(state, rowIndex, columnIndex));
  const [cellColor, setCellColor] = useState(null);

  const toggleON = () => {
    dispatch(toggleCellON({
      row: rowIndex,
      column: columnIndex,
      rgba: [255, 0, 0, 255],  // TODO: use a color picker from colors in the table cells rgbas
    }));
  };
  const toggleOFF = (e) => {
    e.preventDefault(); // Prevent context menu to open
    dispatch(toggleCellOFF({ row: rowIndex, column: columnIndex }));
  };

  useEffect(() => {
    if (tableCell.state) {
      setCellColor(`rgba(${tableCell.state[0]}, ${tableCell.state[1]}, ${tableCell.state[2]}, ${tableCell.state[3]})`);
    }
    else {
      setCellColor('inherit');
    }
  }, [tableCell.state]);

  return (
    <div
      className={classNames(
        'cell board-cell',
        // tableCell.state can be equal to null
        { 'board-cell--off': tableCell?.state === false },
      )}
      style={{ backgroundColor: cellColor }}
      onClick={toggleON}
      onContextMenu={toggleOFF}
    />
  );
}

BoardCell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
};

export default BoardCell;
