import { useState, useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPlayersWithOdds } from "@modules/player/data-access/application/queries/useGetPlayersWithOdds";
import { useCreateTeam } from "@modules/team/data-access/application/mutations/useCreateTeam";
import { useUpdateTeam } from "@modules/team/data-access/application/mutations/useUpdateTeam";
import type { PlayerWithOddsT } from "@modules/player/domain/repositories";
import { toast } from "sonner";

const TOTAL_PICKS = 5;

type UseMakeYourPicksFormOptions = {
  entryId: number;
  tournamentId: number;
  existingTeamId?: number;
  onSuccess?: () => void;
};

export function useMakeYourPicksForm({
  entryId,
  tournamentId,
  existingTeamId,
  onSuccess: onSuccessCallback,
}: UseMakeYourPicksFormOptions) {
  const queryClient = useQueryClient();

  const [picks, setPicks] = useState<(PlayerWithOddsT | null)[]>(
    Array(TOTAL_PICKS).fill(null)
  );
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: players, isFetching: isLoadingPlayers } =
    useGetPlayersWithOdds({
      params: { tournamentId },
    });

  const invalidateTeam = () =>
    queryClient.invalidateQueries({ queryKey: ["GET", "TEAM", "BY_ENTRY_ID", entryId] });

  const { createTeam, isPending: isCreating } = useCreateTeam({
    config: {
      onSuccess: () => {
        toast.success("Team created successfully!");
        invalidateTeam();
        onSuccessCallback?.();
      },
    },
  });

  const { updateTeam, isPending: isUpdating } = useUpdateTeam({
    config: {
      onSuccess: () => {
        toast.success("Team updated successfully!");
        invalidateTeam();
        onSuccessCallback?.();
      },
    },
  });

  const pickedPlayerIds = useMemo(
    () => new Set(picks.filter(Boolean).map((p) => p!.playerId)),
    [picks]
  );

  const filteredPlayers = useMemo(() => {
    if (!players) return [];
    return players.filter((p) => {
      if (pickedPlayerIds.has(p.playerId)) return false;
      if (searchQuery) {
        return p.playerName.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
  }, [players, pickedPlayerIds, searchQuery]);

  const totalCategory = useMemo(
    () =>
      picks.reduce((sum, p) => sum + (p?.category ?? 0), 0),
    [picks]
  );

  const allSlotsFilled = picks.every((p) => p !== null);
  const canSubmit = allSlotsFilled && totalCategory >= 13;

  const selectPlayer = useCallback(
    (player: PlayerWithOddsT) => {
      if (activeSlotIndex === null) return;
      setPicks((prev) => {
        const next = [...prev];
        next[activeSlotIndex] = player;
        return next;
      });
      setActiveSlotIndex(null);
      setSearchQuery("");
    },
    [activeSlotIndex]
  );

  const removePick = useCallback((index: number) => {
    setPicks((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  const initializePicks = useCallback((initialPicks: (PlayerWithOddsT | null)[]) => {
    setPicks(initialPicks);
  }, []);

  const openSlot = useCallback((index: number) => {
    setActiveSlotIndex(index);
    setSearchQuery("");
  }, []);

  const closeSlot = useCallback(() => {
    setActiveSlotIndex(null);
    setSearchQuery("");
  }, []);

  const onSubmit = useCallback(() => {
    const filledPicks = picks.filter(Boolean) as PlayerWithOddsT[];
    if (filledPicks.length !== TOTAL_PICKS) return;

    const picksData = filledPicks.map((p) => ({
      playerId: p.playerId,
      playerCategory: p.category,
    }));

    if (existingTeamId) {
      updateTeam({ teamId: existingTeamId, data: { picks: picksData } });
    } else {
      createTeam({ entryId, picks: picksData });
    }
  }, [picks, existingTeamId, updateTeam, createTeam, entryId]);

  return {
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
    isLoadingPlayers,
    isSubmitting: isCreating || isUpdating,
  };
}
