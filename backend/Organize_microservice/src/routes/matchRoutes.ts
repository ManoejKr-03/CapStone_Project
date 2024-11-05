import { Router } from 'express';
import { createMatch, getAllMatchDetails, getCompletedMatches, getMatchDetails, getOngoingMatches, getUpcomingMatches, updateMatchInfo, updatePlayerStats } from '../controllers/matchController';

const router = Router();

router.post('/', createMatch); // Create match
// router.put('/scores', updateMatchScores); // Update match scores
router.get('/api/matches', getAllMatchDetails);
router.get('/api/matches/:matchId', getMatchDetails);
router.put('/match/:matchId/series/:seriesId', updateMatchInfo);


// PUT endpoint to update player statistics
router.put('/match/:matchId/series/:seriesId/player', updatePlayerStats);


// get the match status route for particular player /api/matches
router.get('/upcoming-matches/:playerId', getUpcomingMatches);
router.get('/ongoing-matches/:playerId', getOngoingMatches);
router.get('/completed-matches/:playerId', getCompletedMatches);




export default router;
