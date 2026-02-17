import { z } from 'zod';
import { dateBackendSchema } from '@libs/shared/backend/data-access-http-client';

// Player Response DTO
export const playerResponseDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string().nullable(),
  worldRanking: z.number().nullable(),
  createdAt: dateBackendSchema,
  updatedAt: dateBackendSchema,
});
export type PlayerResponseDtoT = z.infer<typeof playerResponseDtoSchema>;

// Player With Odds DTO
export const playerWithOddsDtoSchema = z.object({
  playerId: z.number(),
  playerName: z.string(),
  category: z.number(),
  odds: z.number().nullable(),
  country: z.string().nullable(),
  worldRanking: z.number().nullable(),
});
export type PlayerWithOddsDtoT = z.infer<typeof playerWithOddsDtoSchema>;
