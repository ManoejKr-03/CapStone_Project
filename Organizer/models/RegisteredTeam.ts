import mongoose, { Schema, Document } from 'mongoose';

export interface RegisteredTeamDocument extends Document {
  seriesId: string;
  teamId: string;
  teamName: string;
  noOfMatches: number;
  wins: number;
  losses: number;
}

const RegisteredTeamSchema: Schema = new Schema({
  seriesId: { type: String, required: true },
  teamId: { type: String, required: true, unique: true },
  teamName: { type: String, required: true },
  noOfMatches: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
});

export default mongoose.model<RegisteredTeamDocument>('RegisteredTeam', RegisteredTeamSchema);
