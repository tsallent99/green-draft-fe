import { z } from 'zod';
import { zodValidationHandler } from '@libs/shared/utils';

export const playerSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string().nullable(),
  worldRanking: z.number().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type PlayerT = z.infer<typeof playerSchema>;

export class PlayerEntity {
  private _player: PlayerT;

  public get player(): PlayerT {
    return this._player;
  }

  public get id(): number {
    return this._player.id;
  }

  public get name(): string {
    return this._player.name;
  }

  public get country(): string | null {
    return this._player.country;
  }

  public get worldRanking(): number | null {
    return this._player.worldRanking;
  }

  public get createdAt(): string {
    return this._player.createdAt;
  }

  public get updatedAt(): string {
    return this._player.updatedAt;
  }

  constructor(playerData: unknown) {
    const validation = playerSchema.safeParse(playerData);
    this._validatePlayerData(validation);
    this._player = validation.data;
  }

  private _validatePlayerData(
    validation: {
      success: boolean;
      data?: PlayerT;
    }
  ): asserts validation is { success: true; data: PlayerT } {
    zodValidationHandler(validation);
  }
}
