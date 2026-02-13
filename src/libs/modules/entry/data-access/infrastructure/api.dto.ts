import { z } from 'zod';
import { PaymentStatus } from '../../domain/entities';

// Entry Update DTO
export const entryUpdateDtoSchema = z.object({
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  totalScore: z.number().optional(),
});
export type EntryUpdateDtoT = z.infer<typeof entryUpdateDtoSchema>;

// Entry Response DTO
export const entryResponseDtoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  leagueId: z.number(),
  paymentStatus: z.nativeEnum(PaymentStatus),
  totalScore: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type EntryResponseDtoT = z.infer<typeof entryResponseDtoSchema>;
