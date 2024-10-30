import axios from 'axios'; // Use axios to make HTTP requests
import Player, { PlayerInterface } from '../model/player.model'; // Import your Player model and interface

// Create a new player
export const createPlayer = async (playerData: Omit<PlayerInterface, '_id' | 'createdAt' | 'updatedAt'>): Promise<PlayerInterface> => {
    const player = new Player(playerData);
    await player.save(); // Await the save operation
    return player;
};

// Get all players
export const getPlayers = async (): Promise<PlayerInterface[]> => {
    return await Player.find();
};

// Get a single player by ID
export const getPlayerById = async (id: string): Promise<PlayerInterface | null> => {
    return await Player.findById(id);
};

// Get a single player by player_id
export const getPlayerByPlayerId = async (player_id: string): Promise<PlayerInterface | null> => {
    return await Player.findOne({ player_id }); // Search using the player_id field
};

// Update a player
export const updatePlayer = async (id: string, playerData: Partial<Omit<PlayerInterface, '_id' | 'createdAt' | 'updatedAt'>>): Promise<PlayerInterface | null> => {
    return await Player.findByIdAndUpdate(id, playerData, { new: true });
};

// Delete a player
export const deletePlayer = async (id: string): Promise<void> => {
    await Player.findByIdAndDelete(id);
};

export const registerPlayerToTeam = async (
    player_id: string
): Promise<any> => {
    try {
        //console.log(player_id);
        // Fetch the player details using the playerId
        const player = await Player.findOne({ player_id: player_id });
        //console.log('Player fetched:', player);

        if (!player) {
            throw new Error('Player not found');
        }

        // Prepare the payload with all necessary player details
        const playerDetails = {
            playerId: player.player_id,  // Unique player ID
            playerName: player.name,            // Player's name
            age: player.age,              // Player's age
            role: player.role,    
            teamId: player.teamId,          // Player's team ID
        };
       // console.log(playerDetails);

        // Send the registration request to the Team microservice
        //console.log('posting');
        const response = await axios.post(`${process.env.TEAM_SERVICE_URL}/teams/register-player`, playerDetails);

        return response.data; // Return the response from the Team service
    } catch (error: unknown) { // Specify the type of error
        if (error instanceof Error) {
            throw new Error('Failed to register player to team: ' + error.message);
        } else {
            throw new Error('Failed to register player to team: Unknown error occurred.');
        }
    }
};