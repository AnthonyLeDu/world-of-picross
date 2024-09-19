import './index.scss';
import PropTypes from 'prop-types';


function BoardCluesCell({rgba, count}) {
  return (
    <div className={'cell board-clues__row__cell'}>
      {count}
    </div>
  );
}

BoardCluesCell.propTypes = {
  rgba: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.number.isRequired
};

export default BoardCluesCell;
