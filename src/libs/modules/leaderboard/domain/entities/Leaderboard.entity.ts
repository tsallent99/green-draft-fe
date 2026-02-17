import { z } from 'zod';
import { zodValidationHandler } from '@libs/shared/utils';

export const rankingEntrySchema = z.object({
  entryId: z.number(),
  userId: z.number(),
  username: z.string(),
  position: z.number(),
  score: z.number(),
  prize: z.number(),
});

export type RankingEntryT = z.infer<typeof rankingEntrySchema>;

export const leaderboardSchema = z.object({
  id: z.number(),
  leagueId: z.number(),
  rankings: z.array(z.record(z.string(), z.any())).nullable(),
  prizePool: z.number(),
  firstPlacePrize: z.number(),
  secondPlacePrize: z.number(),
  thirdPlacePrize: z.number(),
  lastUpdated: z.date(),
});

export type LeaderboardT = z.infer<typeof leaderboardSchema>;

export const leaderboardDetailedSchema = z.object({
  leagueId: z.number(),
  leagueName: z.string(),
  tournamentName: z.string(),
  prizePool: z.number(),
  firstPlacePrize: z.number(),
  secondPlacePrize: z.number(),
  thirdPlacePrize: z.number(),
  rankings: z.array(rankingEntrySchema),
  lastUpdated: z.date(),
});

export type LeaderboardDetailedT = z.infer<typeof leaderboardDetailedSchema>;

export class LeaderboardEntity {
  private _leaderboard: LeaderboardT;

  public get leaderboard(): LeaderboardT {
    return this._leaderboard;
  }

  public get id(): number {
    return this._leaderboard.id;
  }

  public get leagueId(): number {
    return this._leaderboard.leagueId;
  }

  public get rankings(): Record<string, any>[] | null {
    return this._leaderboard.rankings;
  }

  public get prizePool(): number {
    return this._leaderboard.prizePool;
  }

  public get firstPlacePrize(): number {
    return this._leaderboard.firstPlacePrize;
  }

  public get secondPlacePrize(): number {
    return this._leaderboard.secondPlacePrize;
  }

  public get thirdPlacePrize(): number {
    return this._leaderboard.thirdPlacePrize;
  }

  public get lastUpdated(): Date {
    return this._leaderboard.lastUpdated;
  }

  constructor(leaderboardData: unknown) {
    const validation = leaderboardSchema.safeParse(leaderboardData);
    this._validateLeaderboardData(validation);
    this._leaderboard = validation.data;
  }

  private _validateLeaderboardData(
    validation: {
      success: boolean;
      data?: LeaderboardT;
    }
  ): asserts validation is { success: true; data: LeaderboardT } {
    zodValidationHandler(validation);
  }
}

export class LeaderboardDetailedEntity {
  private _leaderboardDetailed: LeaderboardDetailedT;

  public get leaderboardDetailed(): LeaderboardDetailedT {
    return this._leaderboardDetailed;
  }

  public get leagueId(): number {
    return this._leaderboardDetailed.leagueId;
  }

  public get leagueName(): string {
    return this._leaderboardDetailed.leagueName;
  }

  public get tournamentName(): string {
    return this._leaderboardDetailed.tournamentName;
  }

  public get prizePool(): number {
    return this._leaderboardDetailed.prizePool;
  }

  public get firstPlacePrize(): number {
    return this._leaderboardDetailed.firstPlacePrize;
  }

  public get secondPlacePrize(): number {
    return this._leaderboardDetailed.secondPlacePrize;
  }

  public get thirdPlacePrize(): number {
    return this._leaderboardDetailed.thirdPlacePrize;
  }

  public get rankings(): RankingEntryT[] {
    return this._leaderboardDetailed.rankings;
  }

  public get lastUpdated(): Date {
    return this._leaderboardDetailed.lastUpdated;
  }

  constructor(leaderboardDetailedData: unknown) {
    const validation = leaderboardDetailedSchema.safeParse(leaderboardDetailedData);
    this._validateLeaderboardDetailedData(validation);
    this._leaderboardDetailed = validation.data;
  }

  private _validateLeaderboardDetailedData(
    validation: {
      success: boolean;
      data?: LeaderboardDetailedT;
    }
  ): asserts validation is { success: true; data: LeaderboardDetailedT } {
    zodValidationHandler(validation);
  }
}
