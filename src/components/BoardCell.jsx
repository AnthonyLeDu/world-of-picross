import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getTableCell } from '../store/selectors/board';
import { toggleCell } from '../store/actions/board';
import './BoardCell.css';

function BoardCell({ rowIndex, columnIndex }) {
  const dispatch = useDispatch();
  const tableCell = useSelector((state) => getTableCell(state, rowIndex, columnIndex));

  const toggle = () => {
    dispatch(toggleCell({ row: rowIndex, column: columnIndex }));
  };

  return (
    <div
      className={classNames(
        'board-cell',
        // tableCell.checkState can be equal to null
        { 'board-cell--on': tableCell?.checkState === true },
        { 'board-cell--off': tableCell?.checkState === false },
      )}
      onClick={toggle}
    />
  );
}

BoardCell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
};

export default BoardCell;
