import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Match {
  id: string;
  name: string;
  date: string; // or `Date` if you plan to handle it as a Date object
}

const ViewMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const token = localStorage.getItem('token');
  const tournamentId = 'your-tournament-id'; // Replace with actual tournament ID

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/matches/${tournamentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, [token, tournamentId]);

  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            {match.name} - {new Date(match.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMatches;
