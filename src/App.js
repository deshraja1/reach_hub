import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import GamesList from './GamesList';
import GameDetail from './GameDetail';

const App = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [games, setGames] = useState([]);
  const [ongoingGames, setOngoingGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [error, setError] = useState(null);
  const authToken = 'your_token';  

  const fetchUserDetails = async () => {
    try {
      const accountResponse = await fetch('https://lichess.org/api/account', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!accountResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const accountData = await accountResponse.json();
      setUserDetails(accountData);

      const gamesResponse = await fetch('https://lichess.org/api/games/user/${accountData.username}', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!gamesResponse.ok) {
        throw new Error('Failed to fetch user games');
      }

      const gamesData = await gamesResponse.json();
      setGames(gamesData.games);

      const ongoingGamesResponse = await fetch('https://lichess.org/api/account/playing', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!ongoingGamesResponse.ok) {
        throw new Error('Failed to fetch ongoing games');
      }

      const ongoingGamesData = await ongoingGamesResponse.json();
      setOngoingGames(ongoingGamesData.nowPlaying);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleGameClick = game => {
    setSelectedGame(game);
  };

  return (
    <div>
      <h1>Lichess User Details</h1>
      {error && <p>{error}</p>}
      {userDetails && <UserProfile profile={userDetails.profile} />}
      {games.length > 0 && <GamesList games={games} onGameClick={handleGameClick} />}
      {selectedGame && <GameDetail game={selectedGame} />}
      {ongoingGames.length > 0 && (
        <div>
          <h2>Ongoing Games</h2>
          <ul>
            {ongoingGames.map(game => (
              <li key={game.gameId}>
                <strong>Opponent:</strong> {game.opponent.username}, <strong>Variant:</strong> {game.variant}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;