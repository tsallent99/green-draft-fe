import { useGetTeamByEntryId } from "@modules/team/data-access/application/queries/useGetTeamByEntryId";
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
}: YourPicksTabProps) {
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
        <Button variant="outline" className="mt-4">
          Edit Picks
        </Button>
      )}
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
          variant={allSlotsFilled && totalCategory < 13 ? "destructive" : "secondary"}
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

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (team && team.picks.length > 0) {
    return (
      <FilledPicksView
        entryId={entryId}
        tournamentId={tournamentId}
        leagueStatus={leagueStatus}
      />
    );
  }

  return <MakePicksView entryId={entryId} tournamentId={tournamentId} />;
}
