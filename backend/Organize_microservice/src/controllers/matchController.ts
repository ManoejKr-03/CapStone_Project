import { Request, Response } from 'express';
import Match from '../models/match';
import axios from 'axios';

//another navigation bar for the match creation , update 
// Create a new match
// export const createMatch = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const match = new Match(req.body);
//     await match.save();
//     res.status(201).json(match);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating match', error });
//   }
// };

// creating match ->update match ( searching the scorecard)
// Update match scores
// export const updateMatchScores = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { matchId, firstTeamScore, secondTeamScore, firstTeamWickets, secondTeamWickets, winner } = req.body;

//     const updatedMatch = await Match.findOneAndUpdate(
//       { matchId },
//       { firstTeamScore, secondTeamScore, firstTeamWickets, secondTeamWickets, winner },
//       { new: true }
//     );

//     if (!updatedMatch) {
//        res.status(404).json({ message: 'Match not found' });
//     }

//     res.status(200).json(updatedMatch);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating match scores', error });
//   }
 
// Function to update player stats in the Player Microservice

// const updatePlayerStats = async (playerId: string, runs: number, wickets: number) => {
//   try {
//     console.log(playerId);
//     console.log(runs);
//     console.log(wickets);
//     //change the localhost address for player 
//     const response = await axios.put(`http://localhost:5001/api/players/${playerId}/stats`, { runs, wickets });
                                  
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating stats for player ${playerId}`, error);
//   }
// };

// export const updateMatchScores = async (req: Request, res: Response): Promise<void> => { 
//   try {
//     const { matchId, firstTeamScore, secondTeamScore, firstTeamWickets, secondTeamWickets, winner, firstTeamPlayers, secondTeamPlayers } = req.body;

//     // Find the match by matchId
//     const match = await Match.findOne({ matchId });

//     if (!match) {
//       res.status(404).json({ message: 'Match not found' });
//       return;
//     }

//     // Update match-level scores and result
//     match.firstTeamScore = firstTeamScore ?? match.firstTeamScore;
//     match.secondTeamScore = secondTeamScore ?? match.secondTeamScore;
//     match.firstTeamWickets = firstTeamWickets ?? match.firstTeamWickets;
//     match.secondTeamWickets = secondTeamWickets ?? match.secondTeamWickets;
//     match.winner = winner ?? match.winner;

//     // Update player stats if provided, and send updates to Player Microservice
//     if (firstTeamPlayers && firstTeamPlayers.length === 11) {
//       match.firstTeamPlayers = firstTeamPlayers.map((player: any, index: number) => {
//         const updatedPlayer = {
//           playerId: player.playerId || match.firstTeamPlayers[index].playerId,
//           playerName: player.playerName || match.firstTeamPlayers[index].playerName,
//           runs: player.runs !== undefined ? player.runs : match.firstTeamPlayers[index].runs,
//           wickets: player.wickets !== undefined ? player.wickets : match.firstTeamPlayers[index].wickets,
//         };

//         // Update player stats in Player Microservice
//         updatePlayerStats(updatedPlayer.playerId, updatedPlayer.runs, updatedPlayer.wickets);
        
//         return updatedPlayer;
//       });
//     }

//     if (secondTeamPlayers && secondTeamPlayers.length === 11) {
//       match.secondTeamPlayers = secondTeamPlayers.map((player: any, index: number) => {
//         const updatedPlayer = {
//           playerId: player.playerId || match.secondTeamPlayers[index].playerId,
//           playerName: player.playerName || match.secondTeamPlayers[index].playerName,
//           runs: player.runs !== undefined ? player.runs : match.secondTeamPlayers[index].runs,
//           wickets: player.wickets !== undefined ? player.wickets : match.secondTeamPlayers[index].wickets,
//         };

//         // Update player stats in Player Microservice
//         updatePlayerStats(updatedPlayer.playerId, updatedPlayer.runs, updatedPlayer.wickets);

//         return updatedPlayer;
//       });
//     }

//     // Save the updated match
//     const updatedMatch = await match.save();
//     res.status(200).json(updatedMatch);

//   } catch (error) {
//     res.status(500).json({ message: 'Error updating match scores', error });
//   }
// };


//display the total matches available

export const getAllMatchDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const matches = await Match.find();

    if (!matches || matches.length === 0) {
      res.status(404).json({ message: 'No matches found' });
      return;
    }

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching match details', error });
  }
};


//it is only the match details for the particular matchid
export const getMatchDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { matchId } = req.params;

    const match = await Match.findOne({ matchId });

    if (!match) {
      res.status(404).json({ message: 'Match not found' });
      return;
    }

    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching match details', error });
  }
};

const TEAM_MICROSERVICE_URL = 'http://localhost:5000/api'; // Replace with actual URL
const PLAYER_MICROSERVICE_URL = 'http://localhost:5001/api'


export const createMatch = async (req: Request, res: Response): Promise<void> => {
  const { matchId, matchNumber, matchType, tournamentId, firstTeamId, secondTeamId } = req.body;

  try {
    // Get player IDs for the first team /:teamId/players
    const firstTeamResponse = await axios.get(`${TEAM_MICROSERVICE_URL}/${firstTeamId}/players`);
    const firstTeamPlayerIds = firstTeamResponse.data.players;

    // Get player IDs for the second team
    const secondTeamResponse = await axios.get(`${TEAM_MICROSERVICE_URL}/${secondTeamId}/players`);
    const secondTeamPlayerIds = secondTeamResponse.data.players;

    // Fetch player details for the first team /player/:player_id
    const firstTeamPlayers = await Promise.all(
      firstTeamPlayerIds.map(async (playerId: string) => {
        const playerResponse = await axios.get(`${PLAYER_MICROSERVICE_URL}/player/${playerId}`);
        return {
          playerId: playerResponse.data.playerId,
          playerName: playerResponse.data.playerName,
          runs: 0,
          wickets: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          catches: 0,
          strikeRate: 0,
         // status: 'ongoing',
        };
      })
    );

    // Fetch player details for the second team
    const secondTeamPlayers = await Promise.all(
      secondTeamPlayerIds.map(async (playerId: string) => {
        const playerResponse = await axios.get(`${PLAYER_MICROSERVICE_URL}/player/${playerId}`);
        return {
          playerId: playerResponse.data.playerId,
          playerName: playerResponse.data.playerName,
          runs: 0,
          wickets: 0,
          balls: 0,
          fours: 0,
          sixes: 0,
          catches: 0,
          strikeRate: 0,
          //status: 'completed',
        };
      })
    );

    // Create the match document
    const match = new Match({
      matchId,
      matchNumber,
      matchType,
      tournamentId,
      firstTeamId,
      secondTeamId,
      firstTeamPlayers,
      secondTeamPlayers,
    });

    // Save the match
    await match.save();

    res.status(201).json({ message: 'Match created successfully', match });
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//updating the matchws informaton only not the player information it is present below
export const updateMatchInfo = async (req: Request, res: Response): Promise<void> => {
  const { matchId, seriesId } = req.params;
  const {
    matchNumber,
    matchType,
    tournamentId,
    firstTeamId,
    secondTeamId,
    firstTeamScore,
    secondTeamScore,
    firstTeamWickets,
    secondTeamWickets,
    status,
    winner,
  } = req.body;

  try {
    // Find the match by matchId and seriesId
    const match = await Match.findOne({ matchId, seriesId });
    if (!match) {
      res.status(404).json({ message: 'Match not found' });
      return;
    }

    // Update only the provided fields
    if (matchNumber !== undefined) match.matchNumber = matchNumber;
    if (matchType !== undefined) match.matchType = matchType;
    if (tournamentId !== undefined) match.tournamentId = tournamentId;
    if (firstTeamId !== undefined) match.firstTeamId = firstTeamId;
    if (secondTeamId !== undefined) match.secondTeamId = secondTeamId;
    if (firstTeamScore !== undefined) match.firstTeamScore = firstTeamScore;
    if (secondTeamScore !== undefined) match.secondTeamScore = secondTeamScore;
    if (firstTeamWickets !== undefined) match.firstTeamWickets = firstTeamWickets;
    if (secondTeamWickets !== undefined) match.secondTeamWickets = secondTeamWickets;
    if (status !== undefined) match.status = status;
    if (winner !== undefined) match.winner = winner;

    // Save the updated match document
    await match.save();

    res.status(200).json({ message: 'Match information updated successfully', match });
  } catch (error) {
    console.error('Error updating match information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


//updating the match player information (4s,6s etc)
export const updatePlayerStats = async (req: Request, res: Response): Promise<void> => {
  const { matchId, seriesId } = req.params;
  console.log(req.params);
  const { playerId, playerName, runs, wickets, balls, fours, sixes, catches, strikeRate } = req.body;

  try {
    console.log(matchId,seriesId);
    // Step 1: Find the match by matchId and seriesId
    const match = await Match.findOne({ matchId, seriesId });
    console.log("match value : " + match);
    if (!match) {
      res.status(404).json({ message: 'Match not found' });
      return;
    }

    // Step 2: Find player in the match (from either team)
    const playerInFirstTeam = match.firstTeamPlayers.find((p: any) => p.playerId === playerId);
    const playerInSecondTeam = match.secondTeamPlayers.find((p: any) => p.playerId === playerId);
    const player = playerInFirstTeam || playerInSecondTeam;

    if (!player) {
      res.status(404).json({ message: 'Player not found in this match' });
      return;
    }

    // Step 3: Update player stats in the Player microservice http://localhost:5001/api/player/:playerId/stats'
    
    await axios.put(`${PLAYER_MICROSERVICE_URL}/player/${playerId}/stats`, {
      runs: runs !== undefined ? runs : player.runs,
      wickets: wickets !== undefined ? wickets : player.wickets,
      balls: balls !== undefined ? balls : player.balls,
      fours: fours !== undefined ? fours : player.fours,
      sixes: sixes !== undefined ? sixes : player.sixes,
      catches: catches !== undefined ? catches : player.catches,
      strikeRate: strikeRate !== undefined ? strikeRate : player.strikeRate,
    });

    // Step 4: Update player stats in the match document
    if (runs !== undefined) player.runs += runs;
    if (wickets !== undefined) player.wickets += wickets;
    if (balls !== undefined) player.balls += balls;
    if (fours !== undefined) player.fours += fours;
    if (sixes !== undefined) player.sixes += sixes;
    if (catches !== undefined) player.catches += catches;
    if (strikeRate !== undefined) player.strikeRate = strikeRate;

    // Save the updated match document
    await match.save();

    res.status(200).json({ message: 'Player statistics updated successfully', match });
  } catch (error) {
    console.error('Error updating player stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


