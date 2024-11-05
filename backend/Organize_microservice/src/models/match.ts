import mongoose, { Schema, Document } from 'mongoose';

export interface Player extends Document {
  playerId: string;
  playerName: string;
  runs: number;
  wickets: number;
  balls: number;
  fours: number;
  sixes: number;
  catches: number;
  strikeRate: number;
<<<<<<< HEAD
=======
 // status: string; // e.g., "completed"
>>>>>>> e2a44e1f8b1523bce475786ae268b41ce5d7ee6d
}

const playerSchema: Schema = new Schema({
  playerId: { type: String, required: true },
  playerName: { type: String, required: true },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 },
  catches: { type: Number, default: 0 },
  strikeRate: { type: Number, default: 0 },
<<<<<<< HEAD
});

export interface Match extends Document {
  matchId: string;
  matchNumber: string; // added
  matchType: string; // e.g., 'group', 'semi-final', 'final'
  matchDate: Date; // Date of the match
  matchTime: string; // Time of the match (e.g., "15:00")
  location: string; // Venue of the match
=======
 // status: { type: String, enum: ['completed', 'ongoing'], default: 'completed' },

});


export interface Match extends Document {
  matchId: string;
  matchNumber:string; // added
  matchType:String;  // a -group, semi final, final 
>>>>>>> e2a44e1f8b1523bce475786ae268b41ce5d7ee6d
  tournamentId: string;
  firstTeamId: string;
  secondTeamId: string;
  firstTeamScore: number;
  secondTeamScore: number;
  firstTeamWickets: number;
  secondTeamWickets: number;
  firstTeamPlayers: Player[];
<<<<<<< HEAD
  secondTeamPlayers: Player[];
  status: string; // e.g., 'upcoming', 'ongoing', 'completed'
  winner: string; // Team ID of the winner
=======
  secondTeamPlayers: Player[];    // STATUS:COMPLETED;    
  status:string;        
  winner: string;
>>>>>>> e2a44e1f8b1523bce475786ae268b41ce5d7ee6d
}

const matchSchema: Schema = new Schema({
  matchId: { type: String, required: true },
  matchNumber: { type: String, required: true },
  matchType: { type: String, required: true, enum: ['group', 'semi-final', 'final'] },
<<<<<<< HEAD
  matchDate: { type: Date, required: true }, // Date field for match date
  matchTime: { type: String, required: true }, // Time field for match time
  location: { type: String, required: true }, // Location field for the match venue
=======
>>>>>>> e2a44e1f8b1523bce475786ae268b41ce5d7ee6d
  tournamentId: { type: String, required: true },
  firstTeamId: { type: String, required: true },
  secondTeamId: { type: String, required: true },
  firstTeamScore: { type: Number, default: 0 },
  secondTeamScore: { type: Number, default: 0 },
  firstTeamWickets: { type: Number, default: 0 },
  secondTeamWickets: { type: Number, default: 0 },
  firstTeamPlayers: { type: [Schema.Types.Mixed], default: [] },
  secondTeamPlayers: { type: [Schema.Types.Mixed], default: [] },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
  winner: { type: String, default: null },
});

<<<<<<< HEAD
=======
 

>>>>>>> e2a44e1f8b1523bce475786ae268b41ce5d7ee6d
export default mongoose.model<Match>('Match', matchSchema);
