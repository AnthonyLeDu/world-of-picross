import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getBoardTableCell } from '../../store/selectors/game';
import { toggleCellON, toggleCellOFF } from '../../store/actions/game';
import './index.scss';

function BoardCell({ rowIndex, columnIndex }) {
  const dispatch = useDispatch();
  const tableCell = useSelector((state) => getBoardTableCell(state, rowIndex, columnIndex));

  const toggleON = () => {
    dispatch(toggleCellON({ row: rowIndex, column: columnIndex }));
  };
  const toggleOFF = (e) => {
    e.preventDefault(); // Prevent context menu to open
    dispatch(toggleCellOFF({ row: rowIndex, column: columnIndex }));
  };

  return (
    <div
      className={classNames(
        'cell board-cell',
        // tableCell.checkState can be equal to null
        { 'board-cell--on': tableCell?.checkState === true },
        { 'board-cell--off': tableCell?.checkState === false },
      )}
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
