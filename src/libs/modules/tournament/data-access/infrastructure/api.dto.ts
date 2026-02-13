import { z } from 'zod';
import { TournamentStatus } from '../../domain/entities';

// Tournament Response DTO
export const tournamentResponseDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string().nullable(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  status: z.nativeEnum(TournamentStatus),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type TournamentResponseDtoT = z.infer<typeof tournamentResponseDtoSchema>;
