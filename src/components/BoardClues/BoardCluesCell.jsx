import './index.scss';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { rgbaStringFromArray } from '../../utils';
import { useDispatch } from 'react-redux';
import { setCurrentRgba } from '../../store/actions/game';

function BoardCluesCell({ rgba, count }) {
  const dispatch = useDispatch();

  const backgroundColor = useMemo(() => rgbaStringFromArray(rgba), [rgba]);

  const color = useMemo(() => {
    const luminance = (0.299 * rgba[0] + 0.587 * rgba[1] + 0.114 * rgba[2] * (rgba[3])) / 255;
    return luminance > 0.5 ? 'black' : 'white';
  }, [rgba]);

  const pipette = useMemo(() => {
    const svgString = `
    <svg height="32px" width="32px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 481.758 381.758" xml:space="preserve">
    <path style="fill:${backgroundColor};" stroke="${color}" stroke-width="20" d="M193.801,249.068l-92,92c-4.02,4.02-8.8,7.09-13.99,9.08c-5.19,2-10.8,2.92-16.47,2.63
      c-11.35-0.59-22.42,3.66-30.46,11.7l-12.38,12.39c-3.27,3.26-7.55,4.89-11.83,4.89c-4.33,0.01-8.66-1.66-11.94-5
      c-6.48-6.6-6.13-17.31,0.41-23.86l12.08-12.08c4.02-4.02,7.09-8.8,9.08-13.99c2.02-5.23,2.93-10.88,2.62-16.6
      c-0.62-11.3,3.71-22.32,11.72-30.32l30.83-30.84h0.01H193.801z"/>
    <polygon style="fill:#EAE8DC;" stroke="${color}" stroke-width="20" points="169.541,150.997 230.711,212.158 193.801,249.068 71.481,249.068 "/>
    <path style="fill:#C97E6F;" stroke="#000000" stroke-width="10" d="M262.211,191.768c7.16,7.16,7.16,18.78,0,25.94c-3.59,3.58-8.28,5.38-12.97,5.38
      c-4.7,0-9.4-1.8-12.98-5.38l-5.55-5.55l-61.17-61.16l-5.55-5.56c-7.17-7.16-7.17-18.78,0-25.95c3.58-3.58,8.27-5.37,12.97-5.37
      c4.7,0,9.39,1.79,12.97,5.37l7.69,7.69l56.91,56.91L262.211,191.768z"/>
    <path style="fill:#E59683;" stroke="#000000" stroke-width="10" d="M369.041,12.667c16.89,16.89,16.89,44.27,0,61.16l-110.26,110.26c-1.17,1.17-3.08,1.17-4.25,0
      l-56.91-56.91c-1.18-1.17-1.18-3.08,0-4.26l110.26-110.25C324.771-4.222,352.151-4.222,369.041,12.667z"/>
    </svg>
    `;
    // Converting to Base64-encoded URL to be able to pass it to the cursor property below
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  }, [backgroundColor, color]);

  const pickColor = (e) => {
    dispatch(setCurrentRgba(rgba));
  };

  return (
    <div
      className={'cell board-clues__row__cell'}
      style={{
        backgroundColor,
        color,
        cursor: `url(${pipette}) 0 32, pointer`,
      }}
      onClick={pickColor}
    >
      {count}
    </div>
  );
}

BoardCluesCell.propTypes = {
  rgba: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.number.isRequired
};

export default BoardCluesCell;
