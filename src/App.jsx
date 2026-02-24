import { useState } from "react";

import { Player } from "../components/Player";
import { GameBoard } from "../components/Gameboard";
import { Log } from "../components/Log";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function computedActivePlayer(turns) {
  let lastActivePlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") lastActivePlayer = "O";
  return lastActivePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = computedActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;
  let winner = null;

  for (const gameTurn of gameTurns) {
    const { square, player } = gameTurn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }

  for (const winningCombination of WINNING_COMBINATIONS) {
    const firstSquare =
      gameBoard[winningCombination[0].row][winningCombination[0].column];
    const secondSquare =
      gameBoard[winningCombination[1].row][winningCombination[1].column];
    const thirdSquare =
      gameBoard[winningCombination[2].row][winningCombination[2].column];
    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    )
      winner = firstSquare;
  }

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
        {winner && <p>{winner} won!</p>}
        <GameBoard
          activePlayer={activePlayer}
          onSquareSelect={handleSquareSelect}
          gameBoard={gameBoard}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
