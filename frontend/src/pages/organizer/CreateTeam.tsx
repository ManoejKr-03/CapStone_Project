import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/organizer/CreateTeam.css';

const CreateTeam: React.FC = () => {
  const [teamData, setTeamData] = useState({
    teamId: '',
    teamName: '',
  });

  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTeamData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:7000/api/teams/api/teams', teamData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set Content-Type to application/json
        },
      });

      setMessage('Team created successfully!');
      // Reset form
      setTeamData({ teamId: '', teamName: '' });
    } catch (error) {
      console.error(error); // Log the error for debugging
      setMessage('Failed to create team. Please try again.');
    }
  };

  return (
    <div className="create-team-container">
      <h2>Create Team</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teamId">Team ID</label>
          <input
            type="text"
            name="teamId"
            value={teamData.teamId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="teamName">Team Name</label>
          <input
            type="text"
            name="teamName"
            value={teamData.teamName}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Create Team
        </button>
      </form>
    </div>
  );
};

export default CreateTeam;
