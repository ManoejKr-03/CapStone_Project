import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

const ViewTournaments: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/tournaments');
        setTournaments(response.data);
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      }
    };
    fetchTournaments();
  }, []);

  return (
    <div>
      <h2>All Tournaments</h2>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>
            <strong>{tournament.name}</strong> - {tournament.startDate} to {tournament.endDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTournaments;
