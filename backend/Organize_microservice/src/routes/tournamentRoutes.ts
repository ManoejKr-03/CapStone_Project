import { Router } from 'express';
import { createTournament, getTournaments } from '../controllers/tournamentController';

const router = Router();

router.post('/', createTournament); // Create tournament
router.get('/', getTournaments); // Get all tournaments

export default router;
