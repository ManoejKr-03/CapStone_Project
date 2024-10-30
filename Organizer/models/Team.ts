import mongoose, { Schema, Document } from 'mongoose';

export interface TeamDocument extends Document {
  teamId: string;
  teamName: string;
  seriesId: string;
  noOfMatches: number;
  wins: number;
  losses: number;
  players: string[]; // List of player IDs
}

const TeamSchema: Schema = new Schema({
  teamId: { type: String, required: true, unique: true },
  teamName: { type: String, required: true },
  seriesId: { type: String, required: true },
  noOfMatches: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  players: [{ type: String }], // List of player IDs as strings
});

export default mongoose.model<TeamDocument>('Team', TeamSchema);
