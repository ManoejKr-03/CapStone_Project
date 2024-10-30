import mongoose, { Schema, Document } from 'mongoose';

interface Player extends Document {
  playerId: string;
  playerName: string;
  runs: number;
  wickets: number;
}
const playerSchema: Schema = new Schema({
  playerId: { type: String, required: true },
  playerName: { type: String, required: true },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
});


export interface Match extends Document {
  matchId: string;
  tournamentId: string;
  firstTeamId: string;
  secondTeamId: string;
  firstTeamScore: number;
  secondTeamScore: number;
  firstTeamWickets: number;
  secondTeamWickets: number;
  firstTeamPlayers: Player[];
  secondTeamPlayers: Player[];               
  winner: string;
}

const matchSchema: Schema = new Schema({
  matchId: { type: String, required: true },
  tournamentId: { type: String, required: true },
  firstTeamId: { type: String, required: true },
  secondTeamId: { type: String, required: true },
  firstTeamScore: { type: Number, default: 0 },
  secondTeamScore: { type: Number, default: 0 },
  firstTeamWickets: { type: Number, default: 0 },
  secondTeamWickets: { type: Number, default: 0 },
  firstTeamPlayers: { type: [playerSchema], default: [] },
  secondTeamPlayers: { type: [playerSchema], default: [] },
  winner: { type: String, default: null },
});

export default mongoose.model<Match>('Match', matchSchema);
