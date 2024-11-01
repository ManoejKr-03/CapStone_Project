import { Request, Response } from 'express';
import * as PlayerService from '../services/player.service'; // Import the PlayerService
import player,{ PlayerInterface } from '../model/player.model'; // Import your Player interface
import Player from '../model/player.model';
 
// Create a new player
export const createPlayer = async (req: Request, res: Response): Promise<void> => {
    try {
        const player: PlayerInterface = await PlayerService.createPlayer(req.body);
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ message: 'Error creating player' });
    }
};

// Get all players
export const getPlayers = async (req: Request, res: Response): Promise<void> => {
    try {
        const players: PlayerInterface[] = await PlayerService.getPlayers();
        res.json(players);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching players' });
    }
};

// Get a single player by player_id
export const getPlayer = async (req: Request, res: Response): Promise<void> => {
    try {
        const playerId = req.params.player_id; // Get player_id from the request parameters
        const player: PlayerInterface | null = await PlayerService.getPlayerByPlayerId(playerId); // Call a new service method
        if (!player) {
            res.status(404).json({ message: 'Player not found' });
            return; // Ensure to return after sending a response
        }
        res.json(player);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching player' });
    }
};

// Update a player by player_id
export const updatePlayer = async (req: Request, res: Response): Promise<void> => {
    try {
        const playerId = req.params.player_id; // Get player_id from the request parameters
        const player: PlayerInterface | null = await PlayerService.updatePlayer(playerId, req.body);
        if (!player) {
            res.status(404).json({ message: 'Player not found' });
            return;
        }

        res.json(player);
    } catch (error) {
        res.status(500).json({ message: 'Error updating player' });
    }
};

// Delete a player by player_id
export const deletePlayer = async (req: Request, res: Response): Promise<void> => {
    try {
        await PlayerService.deletePlayer(req.params.player_id);
        res.json({ message: 'Player deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting player' });
    }
};


export const registerPlayerToTeam = async (req: Request, res: Response): Promise<void> => {
    const { playerId} = req.body; // Extract playerId and teamId from the request body
    //console.log(playerId);

    try {
        // Call the PlayerService to register the player with the Team microservice
        const result = await PlayerService.registerPlayerToTeam(playerId);
        res.status(200).json(result); // Send the successful response back to the client
    } catch (error) {
        res.status(500).json({ message: 'Error registering player to team', error });
    }
};



// this end will be auto triggered from organizer micro when player score is updated in match table
export const updatePlayerStats = async (req: Request, res: Response): Promise<void> => {
    const { player_id } = req.params;
    const { runs, wickets } = req.body;

    console.log("Player ID from request:", player_id); // Log the player ID
    console.log("Runs to update:", runs);
    console.log("Wickets to update:", wickets);

    try {
        // Find the player by playerId
        const player = await Player.findOne({ player_id: player_id });
        console.log("Player:", player); // Log the found player
        
        if (!player) {
            res.status(404).json({ message: 'Player not found' });
            return;
        }

        // Update player stats in battingStats and bowlingStats
        if (runs !== undefined) {
            player.battingStats = {
                ...player.battingStats,
                runs: (player.battingStats?.runs || 0) + runs,
            };
        }
        
        if (wickets !== undefined) {
            player.bowlingStats = {
                ...player.bowlingStats,
                wickets: (player.bowlingStats?.wickets || 0) + wickets,
            };
        }

        await player.save();
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ message: 'Error updating player stats', error });
    }
};
