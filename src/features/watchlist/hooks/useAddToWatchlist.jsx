import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWatchlist } from "../api/watchlistApi";

/**
 * Agregar un item a la watchlist
 * @param {string | undefined} profileId
 * @returns
 */
export const useAddToWatchlist = (profileId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      /**@type {import("../watchlist.types").WatchlistItem} */ watchlistItem
    ) => {
      if (typeof profileId === "undefined") {
        throw new Error("Se requiere un profile id");
      }
      await addToWatchlist(profileId, watchlistItem);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist", profileId] });
    },
    mutationKey: ["watchlist", profileId]
  });
};
