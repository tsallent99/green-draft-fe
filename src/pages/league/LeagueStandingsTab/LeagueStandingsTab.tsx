import { Trophy } from "lucide-react";
import { useGetLeaderboardByLeagueId } from "@modules/leaderboard/data-access/application/queries/useGetLeaderboardByLeagueId";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LeagueStandingsTabProps = {
	leagueId: number;
};

const prizeLabels = [
	{ key: "firstPlacePrize", label: "1st Place" },
	{ key: "secondPlacePrize", label: "2nd Place" },
	{ key: "thirdPlacePrize", label: "3rd Place" },
] as const;

export function LeagueStandingsTab({ leagueId }: LeagueStandingsTabProps) {
	const { data: leaderboard, isFetching } = useGetLeaderboardByLeagueId({
		leagueId,
	});

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
							<div
								key={entry.entryId}
								className={`flex items-center justify-between px-4 py-3 ${
									index !== leaderboard.rankings.length - 1 ? "border-b" : ""
								}`}
							>
								<div className="flex items-center gap-3">
									<span className="w-6 text-center text-sm font-bold text-muted-foreground">
										{entry.position}
									</span>
									<span className="text-sm font-medium">{entry.username}</span>
								</div>
								<span className="text-sm font-semibold">{entry.score} pts</span>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
