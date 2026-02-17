import { z } from 'zod';
import { dateBackendSchema } from '@libs/shared/backend/data-access-http-client';

// Ranking Entry DTO
export const rankingEntryDtoSchema = z.object({
  entryId: z.number(),
  userId: z.number(),
  username: z.string(),
  position: z.number(),
  score: z.number(),
  prize: z.number(),
});
export type RankingEntryDtoT = z.infer<typeof rankingEntryDtoSchema>;

// Leaderboard Response DTO
export const leaderboardResponseDtoSchema = z.object({
  id: z.number(),
  leagueId: z.number(),
  rankings: z.array(z.record(z.string(), z.any())).nullable(),
  prizePool: z.number(),
  firstPlacePrize: z.number(),
  secondPlacePrize: z.number(),
  thirdPlacePrize: z.number(),
  lastUpdated: dateBackendSchema,
});
export type LeaderboardResponseDtoT = z.infer<typeof leaderboardResponseDtoSchema>;

// Leaderboard Detailed DTO
export const leaderboardDetailedDtoSchema = z.object({
  leagueId: z.number(),
  leagueName: z.string(),
  tournamentName: z.string(),
  prizePool: z.number(),
  firstPlacePrize: z.number(),
  secondPlacePrize: z.number(),
  thirdPlacePrize: z.number(),
  rankings: z.array(rankingEntryDtoSchema),
  lastUpdated: dateBackendSchema,
});
export type LeaderboardDetailedDtoT = z.infer<typeof leaderboardDetailedDtoSchema>;
