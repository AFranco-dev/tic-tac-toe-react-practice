import { useState } from "react";

function Player({ initialPlayerName, symbol }) {
  const [playerName, setPlayerName] = useState(initialPlayerName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((oldIsEditing) => !oldIsEditing);
  }

  function handleInputChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameDisplay = <span className="player-name">{playerName}</span>;
  if (isEditing)
    playerNameDisplay = (
      <input
        onChange={handleInputChange}
        type="text"
        value={playerName}
        required
      />
    );

  return (
    <li>
      <span className="player">
        {playerNameDisplay}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

export { Player };
