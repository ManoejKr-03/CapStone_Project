import { Router } from 'express';
import * as PlayerController from '../controller/player.controller';

const router = Router();

router.post('/', PlayerController.createPlayer);
router.get('/', PlayerController.getPlayers);
router.get('/player_id/:player_id', PlayerController.getPlayer); // Update here
router.put('/player_id/:player_id', PlayerController.updatePlayer); // Update here
router.delete('/player_id/:player_id', PlayerController.deletePlayer); // Update here
router.post('/register/:playerId/:teamId', PlayerController.registerPlayerToTeam); //player to team registered player
 
router.put('/players/:player_id/stats', PlayerController.updatePlayerStats);
 router.get('/player/:player_id',PlayerController.getPlayerIdplayernamefromplayerid);
//http://localhost:3001/api/players/${playerId}/stats

export default router;
