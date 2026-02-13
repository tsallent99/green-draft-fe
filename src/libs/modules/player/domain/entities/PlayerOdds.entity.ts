import { z } from 'zod';
import { zodValidationHandler } from '@libs/shared/utils';

export const playerOddsSchema = z.object({
  id: z.number(),
  playerId: z.number(),
  tournamentId: z.number(),
  category: z.number().min(1).max(5),
  odds: z.number().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type PlayerOddsT = z.infer<typeof playerOddsSchema>;

export class PlayerOddsEntity {
  private _playerOdds: PlayerOddsT;

  public get playerOdds(): PlayerOddsT {
    return this._playerOdds;
  }

  public get id(): number {
    return this._playerOdds.id;
  }

  public get playerId(): number {
    return this._playerOdds.playerId;
  }

  public get tournamentId(): number {
    return this._playerOdds.tournamentId;
  }

  public get category(): number {
    return this._playerOdds.category;
  }

  public get odds(): number | null {
    return this._playerOdds.odds;
  }

  public get createdAt(): string {
    return this._playerOdds.createdAt;
  }

  public get updatedAt(): string {
    return this._playerOdds.updatedAt;
  }

  constructor(playerOddsData: unknown) {
    const validation = playerOddsSchema.safeParse(playerOddsData);
    this._validatePlayerOddsData(validation);
    this._playerOdds = validation.data;
  }

  private _validatePlayerOddsData(
    validation: {
      success: boolean;
      data?: PlayerOddsT;
    }
  ): asserts validation is { success: true; data: PlayerOddsT } {
    zodValidationHandler(validation);
  }
}
