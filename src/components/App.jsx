import './App.scss';
import Auth from './Auth';
import Game from './Game';
import GamesMenu from './GamesMenu';


function App() {

  return (
    <div className="App">
      <Auth />
      <GamesMenu />
      <Game />
    </div>
  );
}

export default App;
