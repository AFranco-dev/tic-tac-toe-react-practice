import { useState } from "react";

import { Player } from "../components/Player";
import { GameBoard } from "../components/Gameboard";
import { Log } from "../components/Log";
import { GameOver } from "../components/GameOver.jsx";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = { X: "Player 1", O: "Player 2" };

function computedActivePlayer(turns) {
  let lastActivePlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") lastActivePlayer = "O";
  return lastActivePlayer;
}

function computedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAMEBOARD.map((array) => [...array])];
  for (const gameTurn of gameTurns) {
    const { square, player } = gameTurn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }
  return gameBoard;
}

function computedWinner(gameBoard, players) {
  let winner = null;
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
      winner = players[firstSquare];
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = computedActivePlayer(gameTurns);
  const gameBoard = computedGameBoard(gameTurns);
  const winner = computedWinner(gameBoard, players);
  const gameDraw = gameTurns.length === 9 && !winner;

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

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            initialPlayerName={PLAYERS.X}
            symbol="X"
            onChangeName={handlePlayerNameChange}
          />
          <Player
            isActive={activePlayer === "O"}
            initialPlayerName={PLAYERS.O}
            symbol="O"
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || gameDraw) && (
          <GameOver winner={winner} onClick={handleRestart} />
        )}
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
