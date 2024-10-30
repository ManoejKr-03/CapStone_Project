import mongoose, { Schema, Document } from 'mongoose';

export interface MatchDocument extends Document {
  matchId: string;
  seriesId: string;
  firstTeamId: string;
  secondTeamId: string;
  firstTeamScore: number;
  secondTeamScore: number;
  firstTeamWickets: number;
  secondTeamWickets: number;
  winner: string;
}

const MatchSchema: Schema = new Schema({
  matchId: { type: String, required: true, unique: true },
  seriesId: { type: String, required: true },
  firstTeamId: { type: String, required: true },
  secondTeamId: { type: String, required: true },
  firstTeamScore: { type: Number, default: 0 },
  secondTeamScore: { type: Number, default: 0 },
  firstTeamWickets: { type: Number, default: 0 },
  secondTeamWickets: { type: Number, default: 0 },
  winner: { type: String, default: '' },
});

export default mongoose.model<MatchDocument>('Match', MatchSchema);
