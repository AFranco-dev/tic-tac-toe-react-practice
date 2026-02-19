import { useState } from "react";

import { Player } from "../components/Player";
import { GameBoard } from "../components/Gameboard";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSquareSelect() {
    setActivePlayer((currActivePlayer) =>
      currActivePlayer === "X" ? "O" : "X",
    );
  }

  return (
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player
          isActive={activePlayer === "X" ? true : false}
          initialPlayerName="Player 1"
          symbol="X"
        />
        <Player
          isActive={activePlayer === "X" ? false : true}
          initialPlayerName="Player 2"
          symbol="O"
        />
      </ol>
      <GameBoard
        activePlayer={activePlayer}
        onSquareSelect={handleSquareSelect}
      />
    </div>
  );
}

export default App;
