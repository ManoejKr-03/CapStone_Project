// routes/teamRoutes.ts
import { Router } from 'express';
import {
  fetchTeamStatistics,
  addRegisteredPlayer,
  getRegisteredPlayers,
  processPlayerRequest,
  createNewTeam,
  fetchTeamDetails,
} from '../controllers/teamController';

const router = Router();

// Create a new team
router.post('/teams', createNewTeam);

// Fetch team details by team ID
router.get('/teams/:teamId', fetchTeamDetails);


// Team statistics endpoint
router.get('/teams/:teamId/statistics', fetchTeamStatistics);

// Register a player to registered_players (for Player microservice)
router.post('/teams/register-player', addRegisteredPlayer);

// List registered players for a team
router.get('/teams/:teamId/registered-players', getRegisteredPlayers);

// Accept or reject a registered player
router.post('/teams/:teamId/registered-players/:action', processPlayerRequest);

export default router;
