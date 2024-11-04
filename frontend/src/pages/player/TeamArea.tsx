// src/components/TeamArea.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/TeamArea.css';

interface Team {
  teamId: string;
  teamName: string;
}

const TeamArea: React.FC = () => {
  const { tournamentId } = useParams<{ tournamentId: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:7000/api/tournaments/api/tournaments/${tournamentId}/teams`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeams(response.data);
      } catch (err) {
        setError('Failed to fetch teams');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [tournamentId]);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="team-area-container">
      <h2 className="team-heading">Teams in Tournament</h2>
      <div className="team-cards-container">
        {teams.map((team) => (
          <div key={team.teamId} className="team-card">
            <img src="https://via.placeholder.com/80" alt="Team Logo" className="team-logo" />
            <div className="team-info">
              <h3 className="team-name">{team.teamName}</h3>
              <p className="team-id">ID: {team.teamId}</p>
              <button className="join-team-button">Join Team</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamArea;
