import { LeaderboardRepository } from '../../domain/repositories';
import { LeaderboardT, LeaderboardDetailedT, RankingEntryT } from '../../domain/entities';

const mockLeaderboards: Record<number, LeaderboardDetailedT> = {
  1: {
    leagueId: 1,
    leagueName: 'Masters 2024 Pool',
    tournamentName: 'The Masters',
    prizePool: 500,
    firstPlacePrize: 250,
    secondPlacePrize: 150,
    thirdPlacePrize: 100,
    rankings: [
      {
        entryId: 1,
        userId: 1,
        username: 'johndoe',
        position: 1,
        score: 85.5,
        prize: 250,
      },
      {
        entryId: 2,
        userId: 2,
        username: 'janedoe',
        position: 2,
        score: 78.2,
        prize: 150,
      },
    ],
    lastUpdated: new Date().toISOString(),
  },
};

export class LeaderboardFakeAdapter implements LeaderboardRepository {
  async getLeaderboardByLeagueId(leagueId: number): Promise<LeaderboardDetailedT> {
    const leaderboard = mockLeaderboards[leagueId];
    if (!leaderboard) {
      throw new Error('Leaderboard not found');
    }
    return leaderboard;
  }

  async refreshLeaderboard(leagueId: number): Promise<LeaderboardT> {
    const leaderboard = mockLeaderboards[leagueId];
    if (!leaderboard) {
      throw new Error('Leaderboard not found');
    }

    // Simulate refresh by updating lastUpdated
    leaderboard.lastUpdated = new Date().toISOString();

    return {
      id: 1,
      leagueId: leagueId,
      rankings: leaderboard.rankings.map((r) => ({
        entryId: r.entryId,
        userId: r.userId,
        username: r.username,
        position: r.position,
        score: r.score,
        prize: r.prize,
      })),
      prizePool: leaderboard.prizePool,
      firstPlacePrize: leaderboard.firstPlacePrize,
      secondPlacePrize: leaderboard.secondPlacePrize,
      thirdPlacePrize: leaderboard.thirdPlacePrize,
      lastUpdated: leaderboard.lastUpdated,
    };
  }
}
