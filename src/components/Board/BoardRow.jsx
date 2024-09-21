import './index.scss';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import BoardCell from './BoardCell';
import { getBoardColumnsCount } from '../../store/selectors/game';

function BoardRow({ index }) {
  const columnsCount = useSelector(getBoardColumnsCount);

  return (
    <div
      className="board-row"
    >
      {
        [...Array(columnsCount)].map((v, i) => (
          <BoardCell
            // eslint-disable-next-line react/no-array-index-key
            key={`board-cell-${index}-${i}`}
            rowIndex={index}
            columnIndex={i}
          />
        ))
      }
    </div>
  );
}

BoardRow.propTypes = {
  index: PropTypes.number.isRequired,
};

export default BoardRow;
