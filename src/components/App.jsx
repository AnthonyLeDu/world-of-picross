import './App.scss';
import Auth from './Auth';
import Game from './Game';
import GamesMenu from './GamesMenu';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Auth />
      <GamesMenu />
      <Game />
      <ToastContainer
        position="bottom-center"
        closeOnClick
      />
    </div>
  );
}

export default App;
