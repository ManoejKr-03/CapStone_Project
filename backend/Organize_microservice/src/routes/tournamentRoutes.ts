import { Router } from 'express';
import { createOrUpdateTournament , deleteTournament, fetchTeamsForTournament, getTournaments, getTournamentsByUserId, updateTournament } from '../controllers/tournamentController';

const router = Router();

router.post('/', createOrUpdateTournament); // Create tournament and update the tournament
router.get('/tournamentuser/:user_id', getTournamentsByUserId);
router.get('/', getTournaments); // Get all tournaments http://localhost:3000/api/tournaments/(get)
router.put('/tournaments/:tournamentId', updateTournament); 
router.get('/tournaments/:tournamentId/teams', fetchTeamsForTournament); // giving tournament id to get all teams
router.delete('/tournaments/:tournamentId', deleteTournament);
<<<<<<< HEAD
router.get('/', getTournaments);
=======
>>>>>>> e2a44e1f8b1523bce475786ae268b41ce5d7ee6d

export default router;
