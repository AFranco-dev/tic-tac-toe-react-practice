const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function GameBoard({ onSquareSelect, gameTurns }) {
  let gameBoard = initialGameBoard;

  for (const gameTurn of gameTurns) {
    const { square, player } = gameTurn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSquareSelect(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

export { GameBoard };
