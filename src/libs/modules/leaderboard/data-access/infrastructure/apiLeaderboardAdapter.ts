import { LeaderboardRepository } from '../../domain/repositories';
import { LeaderboardT, LeaderboardDetailedT } from '../../domain/entities';
import { leaderboardApi } from './api';

export class ApiLeaderboardAdapter implements LeaderboardRepository {
  async getLeaderboardByLeagueId(leagueId: number): Promise<LeaderboardDetailedT> {
    return await leaderboardApi.getLeaderboardByLeagueId(leagueId);
  }

  async refreshLeaderboard(leagueId: number): Promise<LeaderboardT> {
    return await leaderboardApi.refreshLeaderboard(leagueId);
  }
}
