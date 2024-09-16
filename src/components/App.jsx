import './App.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAvailableGames } from '../store/api/app';
import Game from './Game';
import GamesMenu from './GamesMenu';
import Login from './Login';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAvailableGames());
  }, [dispatch]);

  return (
    <div className="App">
      <Login />
      <GamesMenu />
      <Game />
    </div>
  );
}

export default App;
