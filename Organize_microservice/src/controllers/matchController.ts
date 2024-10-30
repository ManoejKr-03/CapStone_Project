import { Request, Response } from 'express';
import Match from '../models/match';

//another navigation bar for the match creation , update 
// Create a new match
export const createMatch = async (req: Request, res: Response): Promise<void> => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error creating match', error });
  }
};

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
 

export const updateMatchScores = async (req: Request, res: Response): Promise<void> => { 
  try {
    const { matchId, firstTeamScore, secondTeamScore, firstTeamWickets, secondTeamWickets, winner, firstTeamPlayers, secondTeamPlayers } = req.body;

    // Find the match by matchId
    const match = await Match.findOne({ matchId });

    if (!match) {
      res.status(404).json({ message: 'Match not found' });
      return;
    }

    // Update match-level scores and result
    match.firstTeamScore = firstTeamScore ?? match.firstTeamScore;
    match.secondTeamScore = secondTeamScore ?? match.secondTeamScore;
    match.firstTeamWickets = firstTeamWickets ?? match.firstTeamWickets;
    match.secondTeamWickets = secondTeamWickets ?? match.secondTeamWickets;
    match.winner = winner ?? match.winner;

    // Update player stats if provided
    if (firstTeamPlayers && firstTeamPlayers.length === 11) {
      match.firstTeamPlayers = firstTeamPlayers.map((player: any, index: number) => ({
        playerId: player.playerId || match.firstTeamPlayers[index].playerId,
        playerName: player.playerName || match.firstTeamPlayers[index].playerName,
        runs: player.runs !== undefined ? player.runs : match.firstTeamPlayers[index].runs,
        wickets: player.wickets !== undefined ? player.wickets : match.firstTeamPlayers[index].wickets,
      }));
    }

    if (secondTeamPlayers && secondTeamPlayers.length === 11) {
      match.secondTeamPlayers = secondTeamPlayers.map((player: any, index: number) => ({
        playerId: player.playerId || match.secondTeamPlayers[index].playerId,
        playerName: player.playerName || match.secondTeamPlayers[index].playerName,
        runs: player.runs !== undefined ? player.runs : match.secondTeamPlayers[index].runs,
        wickets: player.wickets !== undefined ? player.wickets : match.secondTeamPlayers[index].wickets,
      }));
    }

    // Save the updated match
    const updatedMatch = await match.save();
    res.status(200).json(updatedMatch);

  } catch (error) {
    res.status(500).json({ message: 'Error updating match scores', error });
  }
};


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