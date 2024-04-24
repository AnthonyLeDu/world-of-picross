import './index.scss';
import PropTypes from 'prop-types';


function BoardCluesCell({value}) {
  return (
    <div className={'cell board-clues__row__cell'}>
      {value}
    </div>
  );
}

BoardCluesCell.propTypes = {
  value: PropTypes.number.isRequired,
};

export default BoardCluesCell;
