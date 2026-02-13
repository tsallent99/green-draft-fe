import { LeaderboardT, LeaderboardDetailedT } from '../entities';

// Get leaderboard by league ID
export type GetLeaderboardByLeagueIdFnT = (
  leagueId: number
) => Promise<LeaderboardDetailedT>;

// Refresh leaderboard
export type RefreshLeaderboardFnT = (leagueId: number) => Promise<LeaderboardT>;

export interface LeaderboardRepository {
  getLeaderboardByLeagueId: GetLeaderboardByLeagueIdFnT;
  refreshLeaderboard: RefreshLeaderboardFnT;
}
