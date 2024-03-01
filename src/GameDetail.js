import React from 'react';

const GameDetail = ({ game }) => (
  <div>
    <h2>Game Detail</h2>
    <p><strong>Moves:</strong> {game.moves}</p>
    <p><strong>Winner:</strong> {game.winner}</p>
  </div>
);

export default GameDetail;