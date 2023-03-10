import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Board from './Board';

function App() {
  const table = useSelector((state) => state.board.table);
  useEffect(() => {
    console.log(table);
  }, [table]);

  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
