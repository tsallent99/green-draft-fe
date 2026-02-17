import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { PlayerWithOddsT } from "@modules/player/domain/repositories";

type PlayerAvatarProps = {
  player: PlayerWithOddsT | null;
  onClick: () => void;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function PlayerAvatar({ player, onClick }: PlayerAvatarProps) {
  if (!player) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex flex-col items-center gap-1"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/50">
          <span className="text-[10px] text-muted-foreground text-center leading-tight px-1">
            Select a<br />player
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1"
    >
      <div className="relative">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-sm">
            {getInitials(player.playerName)}
          </AvatarFallback>
        </Avatar>
        <Badge className="absolute -right-2 -top-1 text-[10px] px-1.5 py-0">
          Cat {player.category}
        </Badge>
      </div>
      <span className="max-w-[80px] truncate text-xs text-center">
        {player.playerName}
      </span>
    </button>
  );
}
