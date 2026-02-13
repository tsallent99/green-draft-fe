import { z } from 'zod';
import { zodValidationHandler } from '@libs/shared/utils';

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  REFUNDED = 'refunded',
}

export const entrySchema = z.object({
  id: z.number(),
  userId: z.number(),
  leagueId: z.number(),
  paymentStatus: z.nativeEnum(PaymentStatus),
  totalScore: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type EntryT = z.infer<typeof entrySchema>;

export class EntryEntity {
  private _entry: EntryT;

  public get entry(): EntryT {
    return this._entry;
  }

  public get id(): number {
    return this._entry.id;
  }

  public get userId(): number {
    return this._entry.userId;
  }

  public get leagueId(): number {
    return this._entry.leagueId;
  }

  public get paymentStatus(): PaymentStatus {
    return this._entry.paymentStatus;
  }

  public get totalScore(): number {
    return this._entry.totalScore;
  }

  public get createdAt(): string {
    return this._entry.createdAt;
  }

  public get updatedAt(): string {
    return this._entry.updatedAt;
  }

  constructor(entryData: unknown) {
    const validation = entrySchema.safeParse(entryData);
    this._validateEntryData(validation);
    this._entry = validation.data;
  }

  private _validateEntryData(
    validation: {
      success: boolean;
      data?: EntryT;
    }
  ): asserts validation is { success: true; data: EntryT } {
    zodValidationHandler(validation);
  }
}
