import { z } from 'zod';
import { zodValidationHandler } from '@libs/shared/utils';

export enum LeagueStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export const leagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  creatorId: z.number(),
  tournamentId: z.number(),
  entryFee: z.number().nonnegative(),
  invitationCode: z.string(),
  status: z.nativeEnum(LeagueStatus),
  maxParticipants: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type LeagueT = z.infer<typeof leagueSchema>;

export class LeagueEntity {
  private _league: LeagueT;

  public get league(): LeagueT {
    return this._league;
  }

  public get id(): number {
    return this._league.id;
  }

  public get name(): string {
    return this._league.name;
  }

  public get creatorId(): number {
    return this._league.creatorId;
  }

  public get tournamentId(): number {
    return this._league.tournamentId;
  }

  public get entryFee(): number {
    return this._league.entryFee;
  }

  public get invitationCode(): string {
    return this._league.invitationCode;
  }

  public get status(): LeagueStatus {
    return this._league.status;
  }

  public get maxParticipants(): number {
    return this._league.maxParticipants;
  }

  public get createdAt(): Date {
    return this._league.createdAt;
  }

  public get updatedAt(): Date {
    return this._league.updatedAt;
  }

  constructor(leagueData: unknown) {
    const validation = leagueSchema.safeParse(leagueData);
    this._validateLeagueData(validation);
    this._league = validation.data;
  }

  private _validateLeagueData(
    validation: {
      success: boolean;
      data?: LeagueT;
    }
  ): asserts validation is { success: true; data: LeagueT } {
    zodValidationHandler(validation);
  }
}
