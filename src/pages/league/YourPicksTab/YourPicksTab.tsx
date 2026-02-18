import { useState, useEffect } from "react";
import { useGetTeamByEntryId } from "@modules/team/data-access/application/queries/useGetTeamByEntryId";
import { useGetPlayersWithOdds } from "@modules/player/data-access/application/queries/useGetPlayersWithOdds";
import { LeagueStatus } from "@modules/league/domain/entities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMakeYourPicksForm } from "./form/useMakeYourPicksForm";
import { PlayerAvatar } from "./ui/PlayerAvatar";
import { PlayerSearchList } from "./ui/PlayerSearchList";

type YourPicksTabProps = {
	entryId: number;
	tournamentId: number;
	leagueStatus: LeagueStatus;
};

function FilledPicksView({
	entryId,
	tournamentId,
	leagueStatus,
	onEditStart,
}: YourPicksTabProps & { onEditStart: () => void }) {
	const { data: team } = useGetTeamByEntryId({ entryId });

	if (!team) return null;

	return (
		<div className="flex flex-col items-center gap-6 py-6">
			<div className="flex items-center gap-2 self-end">
				<span className="text-xs font-semibold uppercase text-muted-foreground">
					Total Category
				</span>
				<Badge variant="secondary" className="text-sm">
					{team.picks.reduce((sum, p) => sum + p.playerCategory, 0)}
				</Badge>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-6">
				{team.picks.map((pick) => (
					<div key={pick.id} className="flex flex-col items-center gap-1">
						<div className="relative">
							<Avatar className="h-16 w-16">
								<AvatarFallback className="text-sm">
									P{pick.playerId}
								</AvatarFallback>
							</Avatar>
							<Badge className="absolute -right-2 -top-1 text-[10px] px-1.5 py-0">
								Cat {pick.playerCategory}
							</Badge>
						</div>
						<span className="text-xs">Player #{pick.playerId}</span>
					</div>
				))}
			</div>

			{leagueStatus === LeagueStatus.OPEN && (
				<Button variant="outline" className="mt-4" onClick={onEditStart}>
					Edit Picks
				</Button>
			)}
		</div>
	);
}

function EditPicksView({
	entryId,
	tournamentId,
	teamId,
	onCancel,
	onSaveSuccess,
}: {
	entryId: number;
	tournamentId: number;
	teamId: number;
	onCancel: () => void;
	onSaveSuccess: () => void;
}) {
	const { data: team } = useGetTeamByEntryId({ entryId });
	const { data: allPlayers } = useGetPlayersWithOdds({
		params: { tournamentId },
	});

	const {
		picks,
		activeSlotIndex,
		searchQuery,
		setSearchQuery,
		filteredPlayers,
		totalCategory,
		allSlotsFilled,
		canSubmit,
		selectPlayer,
		removePick,
		initializePicks,
		openSlot,
		closeSlot,
		onSubmit,
		isSubmitting,
	} = useMakeYourPicksForm({ entryId, tournamentId, existingTeamId: teamId, onSuccess: onSaveSuccess });

	// Initialize picks from existing team data
	const [initialized, setInitialized] = useState(false);
	useEffect(() => {
		if (team && allPlayers && !initialized) {
			const mapped = team.picks.map((pick) => {
				const found = allPlayers.find((p) => p.playerId === pick.playerId);
				return (
					found ?? {
						playerId: pick.playerId,
						playerName: `Player #${pick.playerId}`,
						category: pick.playerCategory,
						odds: null,
						country: null,
						worldRanking: null,
					}
				);
			});
			// Pad to 5 if needed
			while (mapped.length < 5) mapped.push(null as any);
			initializePicks(mapped);
			setInitialized(true);
		}
	}, [team, allPlayers, initialized, initializePicks]);

	return (
		<div className="flex flex-col items-center gap-6 py-6">
			<div className="flex items-center gap-2 self-end">
				<span className="text-xs font-semibold uppercase text-muted-foreground">
					Total Category
				</span>
				<Badge
					variant={
						allSlotsFilled && totalCategory < 13 ? "destructive" : "secondary"
					}
					className="text-sm"
				>
					{totalCategory} / 13
				</Badge>
			</div>

			<div className="flex flex-wrap items-start justify-center gap-6">
				{picks.map((player, index) => (
					<PlayerAvatar
						key={index}
						player={player}
						showRemove={player !== null}
						onRemove={() => removePick(index)}
						onClick={() => {
							if (!player) {
								activeSlotIndex === index ? closeSlot() : openSlot(index);
							}
						}}
					/>
				))}
			</div>

			{activeSlotIndex !== null && (
				<div className="w-full max-w-md">
					<PlayerSearchList
						players={filteredPlayers}
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						onSelectPlayer={selectPlayer}
					/>
				</div>
			)}

			<div className="mt-4 flex gap-2">
				<Button variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				{canSubmit && (
					<Button onClick={onSubmit} disabled={isSubmitting}>
						{isSubmitting ? "Saving..." : "Save Changes"}
					</Button>
				)}
			</div>
		</div>
	);
}

function MakePicksView({
	entryId,
	tournamentId,
}: {
	entryId: number;
	tournamentId: number;
}) {
	const {
		picks,
		activeSlotIndex,
		searchQuery,
		setSearchQuery,
		filteredPlayers,
		totalCategory,
		allSlotsFilled,
		canSubmit,
		selectPlayer,
		openSlot,
		closeSlot,
		onSubmit,
		isSubmitting,
	} = useMakeYourPicksForm({ entryId, tournamentId });

	return (
		<div className="flex flex-col items-center gap-6 py-6">
			<div className="flex items-center gap-2 self-end">
				<span className="text-xs font-semibold uppercase text-muted-foreground">
					Total Category
				</span>
				<Badge
					variant={
						allSlotsFilled && totalCategory < 13 ? "destructive" : "secondary"
					}
					className="text-sm"
				>
					{totalCategory} / 13
				</Badge>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-6">
				{picks.map((player, index) => (
					<PlayerAvatar
						key={index}
						player={player}
						onClick={() =>
							activeSlotIndex === index ? closeSlot() : openSlot(index)
						}
					/>
				))}
			</div>

			{activeSlotIndex !== null && (
				<div className="w-full max-w-md">
					<PlayerSearchList
						players={filteredPlayers}
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						onSelectPlayer={selectPlayer}
					/>
				</div>
			)}

			{canSubmit && (
				<Button
					onClick={onSubmit}
					disabled={isSubmitting}
					className="mt-4 w-full max-w-xs"
				>
					{isSubmitting ? "Submitting..." : "Submit Picks"}
				</Button>
			)}
		</div>
	);
}

export function YourPicksTab({
	entryId,
	tournamentId,
	leagueStatus,
}: YourPicksTabProps) {
	const { data: team, isFetching } = useGetTeamByEntryId({
		entryId,
		config: { retry: false },
	});

	const [isEditing, setIsEditing] = useState(false);

	if (isFetching) {
		return (
			<div className="flex items-center justify-center py-12">
				<p className="text-muted-foreground">Loading...</p>
			</div>
		);
	}

	if (team && team.picks.length > 0 && !isEditing) {
		return (
			<FilledPicksView
				entryId={entryId}
				tournamentId={tournamentId}
				leagueStatus={leagueStatus}
				onEditStart={() => setIsEditing(true)}
			/>
		);
	}

	if (team && team.picks.length > 0 && isEditing) {
		return (
			<EditPicksView
				entryId={entryId}
				tournamentId={tournamentId}
				teamId={team.id}
				onCancel={() => setIsEditing(false)}
				onSaveSuccess={() => setIsEditing(false)}
			/>
		);
	}

	return <MakePicksView entryId={entryId} tournamentId={tournamentId} />;
}
