// controllers/teamController.ts
import { Request, Response } from 'express';
import {
  getTeamStatistics,
  registerPlayer,
  listRegisteredPlayers,
  handlePlayerAcceptance,
  createTeam,
  getTeamDetails,
} from '../services/teamService';

//creating the team route handlers
export const createNewTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTeam = await createTeam(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team', error });
  }
};

//fetching the team details by team_id from the database
export const fetchTeamDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const team = await getTeamDetails(req.params.teamId);
    if (team) {
      res.status(200).json(team);
    } else {
      res.status(404).json({ message: 'Team not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team details', error });
  }
};

export const fetchTeamStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const team = await getTeamStatistics(req.params.teamId);
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team statistics', error });
  }
};

// need to pass in player microservice to register in this teams
export const addRegisteredPlayer = async (req: Request, res: Response): Promise<void> => {
  try {
    const registeredPlayer = await registerPlayer(req.body);
    res.status(201).json(registeredPlayer);
  } catch (error) {
    res.status(500).json({ message: 'Error registering player', error });
  }
};

export const getRegisteredPlayers = async (req: Request, res: Response): Promise<void> => {
  try {
    const registeredPlayers = await listRegisteredPlayers(req.params.teamId);
    res.status(200).json(registeredPlayers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registered players', error });
  }
};

//like button accept or reject in front dependices on front end [returned meesage(String)]
export const processPlayerRequest = async (req: Request, res: Response): Promise<void> => {
  const { playerId, teamId } = req.body;
  const action = req.params.action as 'accept' | 'reject';

  try {
    await handlePlayerAcceptance(playerId, teamId, action);
    res.status(200).json({ message: `Player ${action}ed successfully` });
  } catch (error) {
    res.status(500).json({ message: `Error processing player ${action}`, error });
  }
};
