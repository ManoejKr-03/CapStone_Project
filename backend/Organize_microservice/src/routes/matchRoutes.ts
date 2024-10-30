import { Router } from 'express';
import { createMatch, getAllMatchDetails, getMatchDetails, updateMatchScores } from '../controllers/matchController';

const router = Router();

router.post('/', createMatch); // Create match
router.put('/scores', updateMatchScores); // Update match scores
router.get('/api/matches', getAllMatchDetails);
router.get('/api/matches/:matchId', getMatchDetails);
export default router;
