// src/components/PlayerProfile.tsx
import React, { useState } from 'react';
import '../../styles/PlayerProfile.css'; // Import the CSS file

const PlayerProfile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState<'Batter' | 'Bowler' | 'All-Rounder'>('Batter');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [battingStats, setBattingStats] = useState({ runs: 0, matchesPlayed: 0 });
  const [bowlingStats, setBowlingStats] = useState({ wickets: 0, matchesPlayed: 0 });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    console.log({
      name,
      email,
      age,
      role,
      phone,
      profilePic,
      battingStats,
      bowlingStats,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string); // Convert the file to a base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Update Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label className="form-label">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          className="form-input"
        />

        <label className="form-label">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="form-input"
        />

        <label className="form-label">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          required
          className="form-input"
        />

        <label className="form-label">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'Batter' | 'Bowler' | 'All-Rounder')}
          className="form-select"
        >
          <option value="Batter">Batter</option>
          <option value="Bowler">Bowler</option>
          <option value="All-Rounder">All-Rounder</option>
        </select>

        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          className="form-input"
        />

        <label className="form-label">Profile Picture</label>
        <div className="upload-container">
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="file-upload" className="upload-button">
            Upload Picture
          </label>
        </div>
        {profilePic && <img src={profilePic} alt="Profile" className="profile-preview" />}
{/* 
        <div className="stats-container">
          <h3>Batting Stats</h3>
          <p>Runs: {battingStats.runs} | Matches Played: {battingStats.matchesPlayed}</p>
          <h3>Bowling Stats</h3>
          <p>Wickets: {bowlingStats.wickets} | Matches Played: {bowlingStats.matchesPlayed}</p>
        </div> */}

        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default PlayerProfile;
