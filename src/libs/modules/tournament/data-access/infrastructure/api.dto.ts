import { z } from 'zod';
import { dateBackendSchema } from '@libs/shared/backend/data-access-http-client';
import { TournamentStatus } from '../../domain/entities';

// Tournament Response DTO
export const tournamentResponseDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string().nullable(),
  startDate: dateBackendSchema,
  endDate: dateBackendSchema,
  status: z.nativeEnum(TournamentStatus),
  createdAt: dateBackendSchema,
  updatedAt: dateBackendSchema,
});
export type TournamentResponseDtoT = z.infer<typeof tournamentResponseDtoSchema>;
