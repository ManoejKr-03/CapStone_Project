import { Router } from 'express';
import { createTournament , deleteTournament, fetchTeamsForTournament, getTournaments, getTournamentsByUserId, updateTournament } from '../controllers/tournamentController';

const router = Router();

router.post('/', createTournament); // Create tournament
router.get('/tournamentuser/:user_id', getTournamentsByUserId);
router.get('/', getTournaments); // Get all tournaments http://localhost:3000/api/tournaments/(get)
router.put('/tournaments/:tournamentId', updateTournament); 
router.get('/tournaments/:tournamentId/teams', fetchTeamsForTournament); // giving tournament id to get all teams
router.delete('/tournaments/:tournamentId', deleteTournament);

export default router;
