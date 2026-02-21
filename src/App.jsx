import { useState } from "react";

import { Player } from "../components/Player";
import { GameBoard } from "../components/Gameboard";
import { Log } from "../components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSquareSelect(rowIndex, colIndex) {
    setActivePlayer((currActivePlayer) =>
      currActivePlayer === "X" ? "O" : "X",
    );
    setGameTurns((prevGameTurns) => {
      let lastActivePlayer = "X";
      if (prevGameTurns.length > 0 && prevGameTurns[0].player === "X")
        lastActivePlayer = "O";
      return [
        {
          square: { rowIndex: rowIndex, colIndex: colIndex },
          player: lastActivePlayer,
        },
        ...prevGameTurns,
      ];
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            initialPlayerName="Player 1"
            symbol="X"
          />
          <Player
            isActive={activePlayer === "O"}
            initialPlayerName="Player 2"
            symbol="O"
          />
        </ol>
        <GameBoard
          activePlayer={activePlayer}
          onSquareSelect={handleSquareSelect}
          gameTurns={gameTurns}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
