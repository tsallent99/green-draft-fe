import { z } from 'zod';
import { zodValidationHandler } from '@libs/shared/utils';
import { teamPickSchema, type TeamPickT } from './TeamPick.entity';

export const teamSchema = z.object({
  id: z.number(),
  entryId: z.number(),
  isValid: z.boolean(),
  totalCategoryPoints: z.number(),
  picks: z.array(teamPickSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type TeamT = z.infer<typeof teamSchema>;

export class TeamEntity {
  private _team: TeamT;

  public get team(): TeamT {
    return this._team;
  }

  public get id(): number {
    return this._team.id;
  }

  public get entryId(): number {
    return this._team.entryId;
  }

  public get isValid(): boolean {
    return this._team.isValid;
  }

  public get totalCategoryPoints(): number {
    return this._team.totalCategoryPoints;
  }

  public get picks(): TeamPickT[] {
    return this._team.picks;
  }

  public get createdAt(): string {
    return this._team.createdAt;
  }

  public get updatedAt(): string {
    return this._team.updatedAt;
  }

  constructor(teamData: unknown) {
    const validation = teamSchema.safeParse(teamData);
    this._validateTeamData(validation);
    this._team = validation.data;
  }

  private _validateTeamData(
    validation: {
      success: boolean;
      data?: TeamT;
    }
  ): asserts validation is { success: true; data: TeamT } {
    zodValidationHandler(validation);
  }
}
