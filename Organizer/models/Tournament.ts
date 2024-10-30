import mongoose, { Schema, Document } from 'mongoose';
import { TeamDocument } from './Team.ts';

export interface TournamentDocument extends Document {
  tournamentId: string;
  tournamentName: string;
  startDate: Date;
  endDate: Date;
  noOfOvers: number;
  registrationDeadline: Date;
  rulesAndRegulations: string;
  organizerName: string;
  venue: string;
  winnerTeam: string;
  teams: TeamDocument['_id'][];    // Array of Team IDs
}

const TournamentSchema: Schema = new Schema({
  tournamentId: { type: String, required: true, unique: true },
  tournamentName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  noOfOvers: { type: Number, required: true },
  registrationDeadline: { type: Date, required: true },
  rulesAndRegulations: { type: String },
  organizerName: { type: String, required: true },
  venue: { type: String, required: true },
  winnerTeam: { type: String },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],  // Reference to Team documents
});

export default mongoose.model<TournamentDocument>('Tournament', TournamentSchema);
