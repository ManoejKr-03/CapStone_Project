import React, { useState } from 'react';
import axios from 'axios';

const CreateTournament: React.FC = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreateTournament = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/tournaments', { name, startDate, endDate });
      alert('Tournament created successfully!');
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert('Failed to create tournament');
    }
  };

  return (
    <form onSubmit={handleCreateTournament}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </label>
      <button type="submit">Create Tournament</button>
    </form>
  );
};

export default CreateTournament;
