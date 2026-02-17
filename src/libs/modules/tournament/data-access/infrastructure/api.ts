import { httpClient } from "@libs/shared/backend/data-access-http-client";
import { TournamentResponseDtoT, tournamentResponseDtoSchema } from "./api.dto";
import { z } from "zod";

const BASE_URL = "/tournaments";

export const tournamentApi = {
	getAllTournaments: async (): Promise<TournamentResponseDtoT[]> => {
		const response = await httpClient.get(BASE_URL);
		const validation = z
			.array(tournamentResponseDtoSchema)
			.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},

	getTournamentById: async (
		tournamentId: number,
	): Promise<TournamentResponseDtoT> => {
		const response = await httpClient.get(`${BASE_URL}/${tournamentId}`);
		const validation = tournamentResponseDtoSchema.safeParse(response.data);
		if (!validation.success) {
			throw new Error("Invalid response from server");
		}
		return validation.data;
	},
};
