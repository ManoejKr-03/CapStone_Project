import { Request, Response, Router } from 'express';
import Tournament from '../models/Tournament';
import axios from 'axios';

const router = Router();

// Create a new tournament
export const createTournament = async (req: Request, res: Response): Promise<void> => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ message: 'Error creating tournament', error });
  }
};

//updating the tournaments details 
export const updateTournament = async (req: Request, res: Response): Promise<void> => {
  const { tournamentId } = req.params;
  const updateData = req.body;

  try {
    // Find and update the tournament with new data
    const updatedTournament = await Tournament.findOneAndUpdate(
      { tournamentId }, // Find tournament by tournamentId
      { $set: updateData }, // Update with data provided in request body
      { new: true, runValidators: true } // Return the updated document and apply schema validations
    );

    if (!updatedTournament) {
      res.status(404).json({ message: 'Tournament not found' });
      return;
    }

    res.status(200).json({ message: 'Tournament updated successfully', tournament: updatedTournament });
  } catch (error) {
    console.error('Error updating tournament:', error);
    res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
};


//delete the tournament with respect to tournamentid
export const deleteTournament = async (req: Request, res: Response): Promise<void> => {
  const { tournamentId } = req.params;

  try {
    // Find and delete the tournament by its ID
    const deletedTournament = await Tournament.findOneAndDelete({ tournamentId });

    if (!deletedTournament) {
      res.status(404).json({ message: 'Tournament not found' });
      return;
    }

    res.status(200).json({ message: 'Tournament deleted successfully', deletedTournament });
  } catch (error) {
    console.error('Error deleting tournament:', error);
    res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
};


// Fetch all tournaments
export const getTournaments = async (req: Request, res: Response): Promise<void> => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tournaments', error });
  }
};



// get the tournament by giving the tournament id

// export const getTournamentById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const tournament = await Tournament.findById(req.params.id);
//     if (!tournament) {
//       res.status(404).json({ message: 'Tournament not found' });
//       return;
//     }
//     res.status(200).json(tournament);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching tournament', error });
//   }
// };


 
export const fetchTeamsForTournament = async (req: Request, res: Response) => {
  const { tournamentId } = req.params;

  try {
    // Step 1: Directly fetch the tournament details from the database
    const tournament = await Tournament.findById(tournamentId).select('teams'); // Assuming 'teams' is an array of team IDs

    if (!tournament || !tournament.teams || tournament.teams.length === 0) {
      res.status(404).json({ message: 'No teams found for this tournament' });
      return;
    }
    ///teams/:teamId
    // Step 2: Fetch each team's details concurrently using Promise.all
    const teamDetailsPromises = tournament.teams.map((teamId: string) => 
      axios.get(`http://localhost:5000/teams/${teamId}`).then(response => response.data)
    );

    const teams = await Promise.all(teamDetailsPromises);

    res.status(200).json(teams);
  } catch (error) {
    console.error('Error fetching teams for tournament:', error);
    res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
  }
};


export default router;



