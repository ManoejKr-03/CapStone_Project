// models/Team.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Player {
  playerId: string;
  playerName: string;
  role: string;
}

//Team table information
export interface TeamDocument extends Document {
  teamName: string;
  seriesId: string;
  noOfMatches: number;
  wins: number;
  losses: number;
  players: Player[];
}

// Team model definition
const TeamSchema: Schema = new Schema({
  teamName: { type: String, required: true },
  seriesId: { type: String, required: true },
  noOfMatches: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  players: [{ playerId: String, playerName: String, role: String }],
});

export default mongoose.model<TeamDocument>('Team', TeamSchema);
