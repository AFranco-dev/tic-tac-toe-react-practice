import { useState } from "react";

function Player({ name, symbol }) {
  return (
    <li>
      <span className="player-name">{name}</span>
      <span className="player-symbol">{symbol}</span>
      <button>Edit</button>
    </li>
  );
}

export { Player };
