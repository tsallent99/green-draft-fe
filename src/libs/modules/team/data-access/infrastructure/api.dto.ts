import { z } from 'zod';
import { dateBackendSchema } from '@libs/shared/backend/data-access-http-client';

// Team Pick DTO
export const teamPickCreateDtoSchema = z.object({
  playerId: z.number(),
  playerCategory: z.number().min(1).max(5),
});
export type TeamPickCreateDtoT = z.infer<typeof teamPickCreateDtoSchema>;

export const teamPickResponseDtoSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  playerId: z.number(),
  playerCategory: z.number().min(1).max(5),
  playerScore: z.number(),
  createdAt: dateBackendSchema,
});
export type TeamPickResponseDtoT = z.infer<typeof teamPickResponseDtoSchema>;

// Team Create DTO
export const teamCreateDtoSchema = z.object({
  entryId: z.number(),
  picks: z.array(teamPickCreateDtoSchema).min(5).max(5),
});
export type TeamCreateDtoT = z.infer<typeof teamCreateDtoSchema>;

// Team Update DTO
export const teamUpdateDtoSchema = z.object({
  picks: z.array(teamPickCreateDtoSchema).min(5).max(5).optional(),
});
export type TeamUpdateDtoT = z.infer<typeof teamUpdateDtoSchema>;

// Team Response DTO
export const teamResponseDtoSchema = z.object({
  id: z.number(),
  entryId: z.number(),
  isValid: z.boolean(),
  totalCategoryPoints: z.number(),
  picks: z.array(teamPickResponseDtoSchema),
  createdAt: dateBackendSchema,
  updatedAt: dateBackendSchema,
});
export type TeamResponseDtoT = z.infer<typeof teamResponseDtoSchema>;
