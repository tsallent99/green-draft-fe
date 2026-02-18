import { X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { PlayerWithOddsT } from "@modules/player/domain/repositories";

type PlayerAvatarProps = {
  player: PlayerWithOddsT | null;
  onClick: () => void;
  onRemove?: () => void;
  showRemove?: boolean;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function PlayerAvatar({ player, onClick, onRemove, showRemove }: PlayerAvatarProps) {
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
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <button type="button" onClick={onClick}>
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-sm">
              {getInitials(player.playerName)}
            </AvatarFallback>
          </Avatar>
        </button>
        <Badge className="absolute -right-2 -top-1 text-[10px] px-1.5 py-0">
          Cat {player.category}
        </Badge>
        {showRemove && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
      <span className="max-w-[80px] truncate text-xs text-center">
        {player.playerName}
      </span>
    </div>
  );
}
