import { Router } from 'express';
import { createTournament , deleteTournament, fetchTeamsForTournament, getTournaments, updateTournament } from '../controllers/tournamentController';

const router = Router();

router.post('/', createTournament); // Create tournament
router.get('/', getTournaments); // Get all tournaments
router.put('/tournaments/:tournamentId', updateTournament); 
router.get('/tournaments/:tournamentId/teams', fetchTeamsForTournament); // giving tournament id to get all teams
router.delete('/tournaments/:tournamentId', deleteTournament);
export default router;
