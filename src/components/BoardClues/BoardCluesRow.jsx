import BoardCluesCell from './BoardCluesCell';
import PropTypes from 'prop-types';
import './index.scss';

function BoardCluesRow({content}) {

  return (
    <div className={'board-clues__row'}>
    {
      [...Array(content.length)].map((v, i) => (
          <BoardCluesCell
            // eslint-disable-next-line react/no-array-index-key
            key={`cell-${i}`}
            index={i}
            value={content[i]}
          />
        ))
    }
    </div>
  );
}

BoardCluesRow.propTypes = {
  content: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default BoardCluesRow;
