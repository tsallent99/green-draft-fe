import { useParams } from "react-router-dom";
import { Copy, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useGetLeagueById } from "@modules/league/data-access/application/queries/useGetLeagueById";
import { useGetMyEntries } from "@modules/entry/data-access/application/queries/useGetMyEntries";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { YourPicksTab } from "./YourPicksTab/YourPicksTab";
import { LeagueStandingsTab } from "./LeagueStandingsTab/LeagueStandingsTab";

export function LeagueDetailPage() {
	const { leagueId } = useParams<{ leagueId: string }>();
	const leagueIdNum = Number(leagueId);

	const { data: league, isFetching: isLeagueLoading } = useGetLeagueById({
		leagueId: leagueIdNum,
	});

	const { data: entries, isFetching: isEntriesLoading } = useGetMyEntries();

	if (isLeagueLoading || isEntriesLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<p className="text-muted-foreground">Loading...</p>
			</div>
		);
	}

	if (!league) {
		return (
			<div className="flex items-center justify-center py-12">
				<p className="text-destructive">League not found</p>
			</div>
		);
	}

	const entry = entries?.find((e) => e.leagueId === leagueIdNum);

	if (!entry) {
		return (
			<div className="flex items-center justify-center py-12">
				<p className="text-destructive">
					You don't have an entry in this league
				</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col px-4 py-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold tracking-tight">{league.name}</h1>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm">
							<UserPlus className="mr-1.5 h-4 w-4" />
							Invite Friends
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Invite a Friend</DialogTitle>
							<DialogDescription>
								Share the invitation code below with your friends so they can
								join this league. They can enter it on the "Join a League" page.
							</DialogDescription>
						</DialogHeader>
						<button
							type="button"
							onClick={() => {
								navigator.clipboard.writeText(league.invitationCode);
								toast.success("Invitation code copied to clipboard!");
							}}
							className="flex items-center justify-center gap-3 rounded-lg border-2 border-dashed p-4 transition-colors hover:bg-accent"
						>
							<span className="text-2xl font-bold tracking-widest">
								{league.invitationCode}
							</span>
							<Copy className="h-5 w-5 text-muted-foreground" />
						</button>
					</DialogContent>
				</Dialog>
			</div>

			<Tabs defaultValue="your-picks" className="mt-4">
				<TabsList className="w-full">
					<TabsTrigger value="your-picks" className="flex-1">
						Your Picks
					</TabsTrigger>
					<TabsTrigger value="league-standings" className="flex-1">
						League Standings
					</TabsTrigger>
				</TabsList>

				<TabsContent value="your-picks">
					<YourPicksTab
						entryId={entry.id}
						tournamentId={league.tournamentId}
						leagueStatus={league.status}
					/>
				</TabsContent>

				<TabsContent value="league-standings">
					<LeagueStandingsTab leagueId={leagueIdNum} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
