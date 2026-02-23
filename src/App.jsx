import { useState } from "react";

import { Player } from "../components/Player";
import { GameBoard } from "../components/Gameboard";
import { Log } from "../components/Log";

import WINNING_COMBINATIONS from "./winning-combinations";

function computedActivePlayer(turns) {
  let lastActivePlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") lastActivePlayer = "O";
  return lastActivePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = computedActivePlayer(gameTurns);

  function handleSquareSelect(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const lastActivePlayer = computedActivePlayer(gameTurns);
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
