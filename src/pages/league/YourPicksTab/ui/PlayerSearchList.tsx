import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import type { PlayerWithOddsT } from "@modules/player/domain/repositories";

type PlayerSearchListProps = {
  players: PlayerWithOddsT[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectPlayer: (player: PlayerWithOddsT) => void;
};

export function PlayerSearchList({
  players,
  searchQuery,
  onSearchChange,
  onSelectPlayer,
}: PlayerSearchListProps) {
  return (
    <Command shouldFilter={false} className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="Search players..."
        value={searchQuery}
        onValueChange={onSearchChange}
      />
      <CommandList>
        <CommandEmpty>No players found.</CommandEmpty>
        <CommandGroup>
          {players.map((player) => (
            <CommandItem
              key={player.playerId}
              value={String(player.playerId)}
              onSelect={() => onSelectPlayer(player)}
              className="flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="font-medium">{player.playerName}</span>
                {player.country && (
                  <span className="text-xs text-muted-foreground">
                    {player.country}
                    {player.worldRanking && ` · #${player.worldRanking}`}
                  </span>
                )}
              </div>
              <Badge variant="secondary">Cat {player.category}</Badge>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
