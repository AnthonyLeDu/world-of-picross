import './index.scss';
import PropTypes from 'prop-types';
import BoardCluesLine from './BoardCluesLine';

function BoardClues({ direction, content }) {

  return (
    <div className={`board-clues board-clues--${direction}`}>
      {
        [...Array(content.length)].map((_, i) => (
          <BoardCluesLine
            // eslint-disable-next-line react/no-array-index-key
            key={`board-clues-${direction}-item-${i}`}
            direction={direction}
            index={i}
            content={content[i]}
          />
        ))
      }
    </div>
  );
}

BoardClues.propTypes = {
  direction: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
};

export default BoardClues;
