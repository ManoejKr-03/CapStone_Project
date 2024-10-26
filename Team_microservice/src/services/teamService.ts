// services/teamService.ts
import Team, { TeamDocument } from '../models/Team';
import RegisteredPlayer, { RegisteredPlayerDocument } from '../models/RegisteredPlayer';


//api for creating a new team 
export const createTeam = async (teamData: TeamDocument): Promise<TeamDocument> => {
  const newTeam = new Team(teamData);
  return newTeam.save();
};



// Fetch details of a specific team by ID
export const getTeamDetails = async (teamId: string): Promise<TeamDocument | null> => {
  return Team.findById(teamId);
};



// Fetch team statistics
export const getTeamStatistics = async (teamId: string): Promise<TeamDocument | null> => {
  return Team.findById(teamId);
};



// Register a player for squad management
export const registerPlayer = async (playerData: RegisteredPlayerDocument): Promise<RegisteredPlayerDocument> => {
  const registeredPlayer = new RegisteredPlayer(playerData);
  return registeredPlayer.save();
};

// List all registered players for a team
export const listRegisteredPlayers = async (teamId: string): Promise<RegisteredPlayerDocument[]> => {
  return RegisteredPlayer.find({ teamId });
};

// Accept or reject a registered player
export const handlePlayerAcceptance = async (playerId: string, teamId: string, action: 'accept' | 'reject') => {
  const player = await RegisteredPlayer.findOne({ playerId, teamId });
  if (!player) throw new Error('Player not found in registration list');

  if (action === 'accept') {
    await Team.updateOne(
      { _id: teamId },
      { $push: { players: { playerId: player.playerId, playerName: player.playerName, role: player.role } } }
    );
  }
  await RegisteredPlayer.deleteOne({ playerId, teamId });
};
