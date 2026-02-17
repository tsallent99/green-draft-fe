import { z } from 'zod';
import { zodValidationHandler } from '@libs/shared/utils';

export enum TournamentStatus {
  UPCOMING = 'upcoming',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export const tournamentSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string().nullable(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.nativeEnum(TournamentStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TournamentT = z.infer<typeof tournamentSchema>;

export class TournamentEntity {
  private _tournament: TournamentT;

  public get tournament(): TournamentT {
    return this._tournament;
  }

  public get id(): number {
    return this._tournament.id;
  }

  public get name(): string {
    return this._tournament.name;
  }

  public get location(): string | null {
    return this._tournament.location;
  }

  public get startDate(): Date {
    return this._tournament.startDate;
  }

  public get endDate(): Date {
    return this._tournament.endDate;
  }

  public get status(): TournamentStatus {
    return this._tournament.status;
  }

  public get createdAt(): Date {
    return this._tournament.createdAt;
  }

  public get updatedAt(): Date {
    return this._tournament.updatedAt;
  }

  constructor(tournamentData: unknown) {
    const validation = tournamentSchema.safeParse(tournamentData);
    this._validateTournamentData(validation);
    this._tournament = validation.data;
  }

  private _validateTournamentData(
    validation: {
      success: boolean;
      data?: TournamentT;
    }
  ): asserts validation is { success: true; data: TournamentT } {
    zodValidationHandler(validation);
  }
}
