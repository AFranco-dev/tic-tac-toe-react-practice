import { Player } from "../components/Player";

function App() {
  return (
    <div id="game-container">
      <ol id="players">
        <Player initialPlayerName="Player 1" symbol="X" />
        <Player initialPlayerName="Player 2" symbol="O" />
      </ol>
      GAMEBOARD
    </div>
  );
}

export default App;
