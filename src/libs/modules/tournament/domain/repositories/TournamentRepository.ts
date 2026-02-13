import { TournamentT } from '../entities';

// Get all tournaments
export type GetAllTournamentsFnT = () => Promise<TournamentT[]>;

// Get tournament by ID
export type GetTournamentByIdFnT = (tournamentId: number) => Promise<TournamentT>;

export interface TournamentRepository {
  getAllTournaments: GetAllTournamentsFnT;
  getTournamentById: GetTournamentByIdFnT;
}
