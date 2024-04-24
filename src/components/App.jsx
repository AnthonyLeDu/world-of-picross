import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Board from './Board';
import { fetchAndInitBoard } from '../store/api/board';
import { getTableCompletion, getTableName } from '../store/selectors/board';

function App() {
  const boardName = useSelector(getTableName);
  const tableCompletion = useSelector(getTableCompletion) * 100.0;
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAndInitBoard('A'));
  }, [dispatch]);
  

  return (
    <div className="App">
      <h1>{boardName}</h1>
      <p>Left click : Toggle ON | Right-click : Toggle OFF</p>
      <Board/>
      <p>Completion : {tableCompletion.toFixed(0)} %</p>
    </div>
  );
}

export default App;
