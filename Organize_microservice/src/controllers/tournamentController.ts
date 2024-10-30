import { Request, Response } from 'express';
import Tournament from '../models/Tournament';


// Create a new tournament
export const createTournament = async (req: Request, res: Response): Promise<void> => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tournament', error });
  }
};


// Fetch all tournaments
export const getTournaments = async (req: Request, res: Response): Promise<void> => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tournaments', error });
  }
};
