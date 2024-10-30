 // src/controllers/tournamentController.ts
import { Request, Response } from 'express';
import Tournament from '../models/Tournament';

//creating the tournament sending the form in front end
export const createTournament = async (req: Request, res: Response) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tournament', error });
  }
};

//list the tournaments 
export const listTournaments = async (req: Request, res: Response) => {
  try {
    const tournaments = await Tournament.find().populate('teams');
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tournaments', error });
  }
};

// Handling team registration in tournaments ,[ sending the tournamentid , and teamid only in team microservice]
export const registerTeam = async (req: Request, res: Response) => {
  const { tournamentId, teamId } = req.body;
  try {
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) return res.status(404).json({ message: 'Tournament not found' });

    tournament.teams.push(teamId);
    await tournament.save();
    res.status(200).json({ message: 'Team registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering team', error });
  }
};
