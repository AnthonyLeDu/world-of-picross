import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Board from './Board';
import { fetchAndInitBoard } from '../store/api/board';

function App() {
  const table = useSelector((state) => state.board.table);
  useEffect(() => {
    // console.log(table);
  }, [table]);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAndInitBoard('A'));
  }, [dispatch]);
  

  return (
    <div className="App">
      <Board/>
    </div>
  );
}

export default App;
