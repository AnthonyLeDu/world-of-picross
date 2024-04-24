import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import { fetchAndInitBoard } from '../store/api/board';
import Game from './Game';

function App() {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAndInitBoard('A'));
  }, [dispatch]);


  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;
