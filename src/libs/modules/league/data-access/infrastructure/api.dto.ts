import { z } from 'zod';
import { dateBackendSchema } from '@libs/shared/backend/data-access-http-client';
import { LeagueStatus } from '../../domain/entities';
import { PaymentStatus } from '@modules/entry/domain/entities';

// League Create DTO
export const leagueCreateDtoSchema = z.object({
  name: z.string(),
  tournamentId: z.number(),
  entryFee: z.number().nonnegative(),
  maxParticipants: z.number().optional(),
});
export type LeagueCreateDtoT = z.infer<typeof leagueCreateDtoSchema>;

// League Response DTO
export const leagueResponseDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  creatorId: z.number(),
  tournamentId: z.number(),
  entryFee: z.number(),
  invitationCode: z.string(),
  status: z.nativeEnum(LeagueStatus),
  maxParticipants: z.number(),
  createdAt: dateBackendSchema,
  updatedAt: dateBackendSchema,
});
export type LeagueResponseDtoT = z.infer<typeof leagueResponseDtoSchema>;

// Create League Response DTO
export const createLeagueResponseDtoSchema = z.object({
  league: leagueResponseDtoSchema,
  checkoutUrl: z.string().nullable(),
});
export type CreateLeagueResponseDtoT = z.infer<typeof createLeagueResponseDtoSchema>;

// League Join DTO
export const leagueJoinDtoSchema = z.object({
  invitationCode: z.string(),
});
export type LeagueJoinDtoT = z.infer<typeof leagueJoinDtoSchema>;

// Entry Response DTO
export const entryResponseDtoSchema = z.object({
  id: z.number(),
  userId: z.number(),
  leagueId: z.number(),
  paymentStatus: z.nativeEnum(PaymentStatus),
  totalScore: z.number(),
  createdAt: dateBackendSchema,
  updatedAt: dateBackendSchema,
});
export type EntryResponseDtoT = z.infer<typeof entryResponseDtoSchema>;

// Join League Response DTO
export const joinLeagueResponseDtoSchema = z.object({
  entry: entryResponseDtoSchema,
  checkoutUrl: z.string().nullable(),
});
export type JoinLeagueResponseDtoT = z.infer<typeof joinLeagueResponseDtoSchema>;
