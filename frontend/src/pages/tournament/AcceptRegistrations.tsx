import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Team {
  id: string;
  name: string;
}

const AcceptRegistrations: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const token = localStorage.getItem('token');
  const tournamentId = 'your-tournament-id'; // Replace with actual tournament ID

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/teams/tournament/${tournamentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [token, tournamentId]);

  const acceptRegistration = async (teamId: string) => {
    try {
      await axios.post(
        `http://localhost:7000/api/registrations`,
        {
          tournamentId,
          teamId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Registration accepted successfully!');
    } catch (error) {
      console.error('Error accepting registration:', error);
    }
  };

  return (
    <div>
      <h2>Accept Registrations</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            {team.name} 
            <button onClick={() => acceptRegistration(team.id)}>Accept</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcceptRegistrations;
