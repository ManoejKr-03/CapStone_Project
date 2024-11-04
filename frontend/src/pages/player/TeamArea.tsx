// src/components/TeamArea.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TeamDetails {
  teamName: string;
  coachName: string;
  members: string[];
  upcomingMatches: { match: string; date: string }[];
  tournaments: string[];
  previousResults: { match: string; result: string }[];
}

const TeamArea: React.FC = () => {
  const [teamDetails, setTeamDetails] = useState<TeamDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isRegistered = true; // Change this based on actual player’s team status

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        // Replace with your actual endpoint
        const response = await axios.get('/api/your-team-endpoint');
        setTeamDetails(response.data); // Assuming the response data matches the TeamDetails structure
      } catch (err) {
        setError('Failed to fetch team details');
      } finally {
        setIsLoading(false);
      }
    };

    if (isRegistered) {
      fetchTeamDetails();
    } else {
      setIsLoading(false);
    }
  }, [isRegistered]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="team-section">
      <h2>{isRegistered ? 'Your Team' : 'Join a Team'}</h2>
      {isRegistered && teamDetails ? (
        <div>
          <p>Team Name: {teamDetails.teamName}</p>
          <p>Coach Name: {teamDetails.coachName}</p>
          <p>Team Members:</p>
          <ul>
            {teamDetails.members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
          <p>Upcoming Matches:</p>
          <ul>
            {teamDetails.upcomingMatches.map((match, index) => (
              <li key={index}>{`${match.match} - ${match.date}`}</li>
            ))}
          </ul>
          <p>Tournaments Participating In:</p>
          <ul>
            {teamDetails.tournaments.map((tournament, index) => (
              <li key={index}>{tournament}</li>
            ))}
          </ul>
          <p>Previous Results:</p>
          <ul>
            {teamDetails.previousResults.map((result, index) => (
              <li key={index}>{`${result.match}: ${result.result}`}</li>
            ))}
          </ul>
        </div>
      ) : (
        <button>Register for a Team</button>
      )}
    </div>
  );
};

export default TeamArea;
