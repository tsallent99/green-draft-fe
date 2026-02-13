import { httpClient } from '@libs/shared/backend/data-access-http-client';
import {
  LeaderboardResponseDtoT,
  LeaderboardDetailedDtoT,
  leaderboardResponseDtoSchema,
  leaderboardDetailedDtoSchema,
} from './api.dto';

const BASE_URL = '/leaderboard';

export const leaderboardApi = {
  getLeaderboardByLeagueId: async (
    leagueId: number
  ): Promise<LeaderboardDetailedDtoT> => {
    const response = await httpClient.get(`${BASE_URL}/${leagueId}`);
    const validation = leaderboardDetailedDtoSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error('Invalid response from server');
    }
    return validation.data;
  },

  refreshLeaderboard: async (leagueId: number): Promise<LeaderboardResponseDtoT> => {
    const response = await httpClient.post(`${BASE_URL}/${leagueId}/refresh`, {});
    const validation = leaderboardResponseDtoSchema.safeParse(response.data);
    if (!validation.success) {
      throw new Error('Invalid response from server');
    }
    return validation.data;
  },
};
