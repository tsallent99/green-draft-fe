import { useState } from "react";
import { Trophy } from "lucide-react";
import { useGetLeaderboardByLeagueId } from "@modules/leaderboard/data-access/application/queries/useGetLeaderboardByLeagueId";
import { useGetTeamByEntryId } from "@modules/team/data-access/application/queries/useGetTeamByEntryId";
import type { RankingEntryT } from "@modules/leaderboard/domain/entities";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
} from "@/components/ui/drawer";

type LeagueStandingsTabProps = {
	leagueId: number;
};

const prizeLabels = [
	{ key: "firstPlacePrize", label: "1st Place" },
	{ key: "secondPlacePrize", label: "2nd Place" },
	{ key: "thirdPlacePrize", label: "3rd Place" },
] as const;

function UserPicksDrawerContent({ entryId }: { entryId: number }) {
	const { data: team, isFetching } = useGetTeamByEntryId({ entryId });

	if (isFetching) {
		return (
			<p className="py-8 text-center text-sm text-muted-foreground">
				Loading picks...
			</p>
		);
	}

	if (!team || team.picks.length === 0) {
		return (
			<p className="py-8 text-center text-sm text-muted-foreground">
				No picks yet
			</p>
		);
	}

	return (
		<div className="flex flex-col gap-4 px-4 pb-6">
			<div className="flex items-center justify-center gap-2">
				<span className="text-xs font-semibold uppercase text-muted-foreground">
					Total Category
				</span>
				<Badge variant="secondary" className="text-sm">
					{team.picks.reduce((sum, p) => sum + p.playerCategory, 0)}
				</Badge>
			</div>
			<div className="flex flex-wrap items-start justify-center gap-6">
				{team.picks.map((pick) => (
					<div
						key={pick.id}
						className="flex flex-col items-center gap-1"
					>
						<div className="relative">
							<Avatar className="h-14 w-14">
								<AvatarFallback className="text-xs">
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
		</div>
	);
}

export function LeagueStandingsTab({ leagueId }: LeagueStandingsTabProps) {
	const { data: leaderboard, isFetching } = useGetLeaderboardByLeagueId({
		leagueId,
	});

	const [selectedEntry, setSelectedEntry] = useState<RankingEntryT | null>(
		null
	);

	if (isFetching) {
		return (
			<div className="flex items-center justify-center py-12">
				<p className="text-muted-foreground">Loading...</p>
			</div>
		);
	}

	if (!leaderboard) {
		return (
			<div className="flex items-center justify-center py-12">
				<p className="text-muted-foreground">No standings available yet</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 py-6">
			{/* Prize Pool */}
			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="flex items-center gap-2 text-base">
						<Trophy className="h-4 w-4 text-primary" />
						Prize Pool
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-3xl font-bold">{leaderboard.prizePool}€</p>
					<div className="mt-3 flex gap-2">
						{prizeLabels.map(({ key, label }) => (
							<Badge key={key} variant="secondary" className="text-xs">
								{label}: {leaderboard[key]}€
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Rankings */}
			<div className="flex flex-col gap-2">
				<h3 className="text-sm font-semibold uppercase text-muted-foreground">
					Rankings
				</h3>
				{leaderboard.rankings.length === 0 ? (
					<p className="py-4 text-center text-sm text-muted-foreground">
						No rankings yet
					</p>
				) : (
					<div className="rounded-lg border">
						{leaderboard.rankings.map((entry, index) => (
							<button
								key={entry.entryId}
								type="button"
								onClick={() => setSelectedEntry(entry)}
								className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-accent/50 ${
									index !== leaderboard.rankings.length - 1
										? "border-b"
										: ""
								}`}
							>
								<div className="flex items-center gap-3">
									<span className="w-6 text-center text-sm font-bold text-muted-foreground">
										{entry.position}
									</span>
									<span className="text-sm font-medium">
										{entry.username}
									</span>
								</div>
								<span className="text-sm font-semibold">
									{entry.score} pts
								</span>
							</button>
						))}
					</div>
				)}
			</div>

			{/* User Picks Drawer */}
			<Drawer
				open={selectedEntry !== null}
				onOpenChange={(open) => {
					if (!open) setSelectedEntry(null);
				}}
			>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>{selectedEntry?.username}'s Picks</DrawerTitle>
						<DrawerDescription>
							Score: {selectedEntry?.score} pts
						</DrawerDescription>
					</DrawerHeader>
					{selectedEntry && (
						<UserPicksDrawerContent entryId={selectedEntry.entryId} />
					)}
				</DrawerContent>
			</Drawer>
		</div>
	);
}
