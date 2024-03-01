import React from 'react';

const GamesList = ({ games, onGameClick }) => (
  <div>
    <h2>Games List</h2>
    <ul>
      {games.map(game => (
        <li key={game.id} onClick={() => onGameClick(game)}>
          <strong>Speed:</strong> {game.speed}, <strong>Variant:</strong> {game.variant}, <strong>Moves:</strong> {game.moves}, <strong>Status:</strong> {game.status}
        </li>
      ))}
    </ul>
  </div>
);

export default GamesList;