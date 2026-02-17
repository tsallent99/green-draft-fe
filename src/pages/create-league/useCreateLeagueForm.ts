import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateLeague } from "@modules/league/data-access/application/mutations/useCreateLeague";
import { useGetAllTournaments } from "@modules/tournament/data-access/application/queries/useGetAllTournaments";

const createLeagueSchema = z.object({
	name: z.string().min(1, "League name is required"),
	tournamentId: z.string().min(1, "Please select a tournament"),
	entryFee: z
		.number({ error: "Entry fee is required" })
		.min(0, "Entry fee must be 0 or more"),
	maxParticipants: z
		.union([
			z.literal(""),
			z.number().min(2, "Must have at least 2 participants"),
		])
		.optional()
		.transform((val) => (val === "" || val === undefined ? undefined : val)),
});

type CreateLeagueFormValues = z.input<typeof createLeagueSchema>;

export function useCreateLeagueForm() {
	const navigate = useNavigate();

	const { data: tournaments, isFetching: isTournamentsLoading } =
		useGetAllTournaments();

	const tournamentOptions = useMemo(
		() =>
			(tournaments ?? []).map((t) => ({
				label: t.name,
				value: String(t.id),
			})),
		[tournaments],
	);

	const { createLeague, isPending, error } = useCreateLeague({
		config: {
			onSuccess: (league) => {
				toast.success("League created successfully!");
				navigate(`/your-leagues`);
			},
		},
	});

	const form = useForm<CreateLeagueFormValues>({
		resolver: zodResolver(createLeagueSchema),
		defaultValues: {
			name: "",
			tournamentId: "",
			entryFee: 0,
			maxParticipants: "",
		},
	});

	function onSubmit(values: CreateLeagueFormValues) {
		const maxParticipants =
			values.maxParticipants === "" || values.maxParticipants === undefined
				? undefined
				: Number(values.maxParticipants);

		createLeague({
			name: values.name,
			tournamentId: Number(values.tournamentId),
			entryFee: values.entryFee,
			...(maxParticipants !== undefined && { maxParticipants }),
		});
	}

	return {
		form,
		tournamentOptions,
		isTournamentsLoading,
		onSubmit,
		isPending,
		error,
	};
}
