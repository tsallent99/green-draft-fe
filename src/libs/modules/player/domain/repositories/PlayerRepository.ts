import { PlayerT, PlayerOddsT } from '../entities';

// Get all players
export type GetAllPlayersFnT = () => Promise<PlayerT[]>;

// Get player by ID
export type GetPlayerByIdFnT = (playerId: number) => Promise<PlayerT>;

// Get players with odds for a tournament
export type PlayerWithOddsT = {
  playerId: number;
  playerName: string;
  category: number;
  odds: number | null;
  country: string | null;
  worldRanking: number | null;
};

export type GetPlayersWithOddsParamsT = {
  tournamentId: number;
  category?: number; // Filter by category (1-5)
};

export type GetPlayersWithOddsFnT = (
  params: GetPlayersWithOddsParamsT
) => Promise<PlayerWithOddsT[]>;

export interface PlayerRepository {
  getAllPlayers: GetAllPlayersFnT;
  getPlayerById: GetPlayerByIdFnT;
  getPlayersWithOdds: GetPlayersWithOddsFnT;
}
