// src/components/TeamArea.tsx
import React from 'react';

const TeamArea: React.FC = () => {
  const isRegistered = true; // Set this based on the player’s team status

  return (
    <div className="team-section">
      <h2>{isRegistered ? 'Your Team' : 'Join a Team'}</h2>
      {isRegistered ? (
        <div>
          <p>Team Name: The Warriors</p>
          <p>Upcoming Matches:</p>
          <ul>
            <li>Match 1 - Date</li>
            <li>Match 2 - Date</li>
          </ul>
        </div>
      ) : (
        <button>Register for a Team</button>
      )}
    </div>
  );
};

export default TeamArea;
