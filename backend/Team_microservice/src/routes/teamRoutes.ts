// routes/teamRoutes.ts
import { Router } from 'express';
import {
  fetchTeamStatistics,
  addRegisteredPlayer,
  getRegisteredPlayers,
  //processPlayerRequest,
  createNewTeam,
  // fetchTeamDetails,
  // sendTeamDetailsToOrganizer,
  registerTeamWithOrganizer,
  fetchTournamentsFromOrganizer,
  getTeamById,
  registerPlayerdetails,
  getPlayersByTeamId,
  
} from '../controllers/teamController';

const router = Router();

// Create a new team
router.post('/teams', createNewTeam);

// Fetch team details by team ID
//router.get('/teams/:teamId', fetchTeamDetails);

//router.post('/teams/:teamId/send-to-organizer', sendTeamDetailsToOrganizer);

// Team statistics endpoint
router.get('/teams/:teamId/statistics', fetchTeamStatistics);


// Register a player to registered_players (for Player microservice)
router.post('/teams/register-player', addRegisteredPlayer);

// List registered players for a team
router.get('/teams/db/registered-players', getRegisteredPlayers);

// Accept or reject a registered player
//router.post('/teams/:teamId/registered-players/:action', processPlayerRequest);

router.post('/register-team', registerTeamWithOrganizer);


//http://localhost:5000/api/tournaments
router.get('/tournaments', fetchTournamentsFromOrganizer);

router.get('/teams/:teamId', getTeamById);


// storing in registeredplayer db
router.post('/registerPlayer', registerPlayerdetails);

// get the team player id 
router.get('/:teamId/players', getPlayersByTeamId);


 


export default router;
