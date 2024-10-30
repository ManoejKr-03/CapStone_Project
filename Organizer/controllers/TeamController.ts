import { Request, Response } from 'express';
import Team from '../models/Team';
import { v4 as uuidv4 } from 'uuid';

// Create a new team
export const createTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { teamName, seriesId, noOfMatches = 0, wins = 0, losses = 0, players = [] } = req.body;
    const newTeam = new Team({
      teamId: uuidv4(),
      teamName,
      seriesId,
      noOfMatches,
      wins,
      losses,
      players,
    });
    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error });
  }
};

// Get a list of all teams
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error });
  }
};

// Additional team-related endpoints can be added here as needed
