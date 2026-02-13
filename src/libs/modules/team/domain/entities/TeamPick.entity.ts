import { z } from 'zod';
import { zodValidationHandler } from '@libs/shared/utils';

export const teamPickSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  playerId: z.number(),
  playerCategory: z.number().min(1).max(5),
  playerScore: z.number(),
  createdAt: z.string().datetime(),
});

export type TeamPickT = z.infer<typeof teamPickSchema>;

export class TeamPickEntity {
  private _teamPick: TeamPickT;

  public get teamPick(): TeamPickT {
    return this._teamPick;
  }

  public get id(): number {
    return this._teamPick.id;
  }

  public get teamId(): number {
    return this._teamPick.teamId;
  }

  public get playerId(): number {
    return this._teamPick.playerId;
  }

  public get playerCategory(): number {
    return this._teamPick.playerCategory;
  }

  public get playerScore(): number {
    return this._teamPick.playerScore;
  }

  public get createdAt(): string {
    return this._teamPick.createdAt;
  }

  constructor(teamPickData: unknown) {
    const validation = teamPickSchema.safeParse(teamPickData);
    this._validateTeamPickData(validation);
    this._teamPick = validation.data;
  }

  private _validateTeamPickData(
    validation: {
      success: boolean;
      data?: TeamPickT;
    }
  ): asserts validation is { success: true; data: TeamPickT } {
    zodValidationHandler(validation);
  }
}
