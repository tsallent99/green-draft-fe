import { useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";
import { useGetUserLeagues } from "@modules/league/data-access/application/queries/useGetUserLeagues";
import { LeagueStatus } from "@modules/league/domain/entities";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const statusLabel: Record<LeagueStatus, string> = {
  [LeagueStatus.OPEN]: "Open",
  [LeagueStatus.CLOSED]: "Closed",
  [LeagueStatus.IN_PROGRESS]: "In Progress",
  [LeagueStatus.COMPLETED]: "Completed",
};

const statusVariant: Record<LeagueStatus, "default" | "secondary" | "outline"> = {
  [LeagueStatus.OPEN]: "default",
  [LeagueStatus.IN_PROGRESS]: "default",
  [LeagueStatus.CLOSED]: "secondary",
  [LeagueStatus.COMPLETED]: "outline",
};

export function YourLeaguesPage() {
  const navigate = useNavigate();
  const { data: leagues, isFetching } = useGetUserLeagues();

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!leagues || leagues.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 py-20">
        <Trophy className="h-16 w-16 text-muted-foreground/50" />
        <h2 className="text-xl font-semibold">No leagues yet</h2>
        <p className="text-center text-sm text-muted-foreground">
          You haven't joined any league yet. Create or join one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 py-6">
      <h1 className="text-2xl font-bold tracking-tight">Your Leagues</h1>

      <div className="mt-4 grid gap-3">
        {leagues.map((league) => (
          <Card
            key={league.id}
            className="cursor-pointer transition-colors hover:bg-accent/50"
            onClick={() => navigate(`/your-leagues/${league.id}`)}
          >
            <CardHeader className="flex-row items-center justify-between space-y-0 p-4">
              <div>
                <CardTitle className="text-base">{league.name}</CardTitle>
                <CardDescription className="mt-1">
                  Entry fee: {league.entryFee}€
                </CardDescription>
              </div>
              <Badge variant={statusVariant[league.status]}>
                {statusLabel[league.status]}
              </Badge>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
