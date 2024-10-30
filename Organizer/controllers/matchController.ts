 // src/controllers/matchController.ts
import { Request, Response } from 'express';
import Match from '../models/Match';

//creating match button in front end ( with form)
export const createMatch = async (req: Request, res: Response) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error creating match', error });
  }
};

//update the match button in front end ( with form )
export const updateMatchScore = async (req: Request, res: Response) => {
  const { matchId, firstTeamScore, secondTeamScore, firstTeamWickets, secondTeamWickets, winner } = req.body;
  try {
    const match = await Match.findById(matchId);
    if (!match) return res.status(404).json({ message: 'Match not found' });

    match.firstTeamScore = firstTeamScore;
    match.secondTeamScore = secondTeamScore;
    match.firstTeamWickets = firstTeamWickets;
    match.secondTeamWickets = secondTeamWickets;
    match.winner = winner;

    await match.save();
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error updating match score', error });
  }
};
