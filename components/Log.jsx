function Log({ gameTurns }) {
  return (
    <ol id="log">
      {gameTurns.map((gameTurn) => (
        <li key={`${gameTurn.square.rowIndex}${gameTurn.square.colIndex}`}>
          {gameTurn.player} selected {gameTurn.square.rowIndex},
          {gameTurn.square.colIndex}
        </li>
      ))}
    </ol>
  );
}

export { Log };
