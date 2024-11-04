import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/PlayerDetails.css';

interface BattingStats {
  runs: number;
  matchesPlayed: number;
}

interface BowlingStats {
  wickets: number;
  matchesPlayed: number;
}

interface Player {
  player_id: string;
  user_id: string;
  name: string;
  age: number;
  role: 'Batter' | 'Bowler' | 'All-Rounder';
  profilePic?: string;
  battingStats?: BattingStats;
  bowlingStats?: BowlingStats;
  teamId?: string;
}

const PlayerDetails: React.FC = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        const response = await axios.get<Player>(`http://localhost:7000/api/players/player-id/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlayer(response.data);
      } catch (error) {
        console.error('Error fetching player details:', error);
      }
    };
    fetchPlayerDetails();
  }, [user_id, token]);

  if (!player) {
    return <p>Loading player details...</p>;
  }

  return (
    <div className="player-details-container">
      <h2 className="player-heading">{player.name}'s Profile</h2>
      <div className="player-profile-section">
        <img src={player.profilePic || 'default-profile.png'} alt="Profile" className="profile-image" />
        <div className="player-info">
          <p><strong>Name:</strong> {player.name}</p>
          <p><strong>Age:</strong> {player.age}</p>
          <p><strong>Role:</strong> {player.role}</p>
          <p><strong>Team:</strong> {player.teamId ? player.teamId : 'Not joined a team yet'}</p>
        </div>
      </div>
      
      <div className="stats-section">
        {player.battingStats ? (
          <div className="batting-stats">
            <h3>Batting Stats</h3>
            <p><strong>Runs:</strong> {player.battingStats.runs}</p>
            <p><strong>Matches Played:</strong> {player.battingStats.matchesPlayed}</p>
          </div>
        ) : (
          <p className="no-stats">No batting stats available</p>
        )}
        
        {player.bowlingStats ? (
          <div className="bowling-stats">
            <h3>Bowling Stats</h3>
            <p><strong>Wickets:</strong> {player.bowlingStats.wickets}</p>
            <p><strong>Matches Played:</strong> {player.bowlingStats.matchesPlayed}</p>
          </div>
        ) : (
          <p className="no-stats">No bowling stats available</p>
        )}
      </div>
    </div>
  );
};

export default PlayerDetails;
