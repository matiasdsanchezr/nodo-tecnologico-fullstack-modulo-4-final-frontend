import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromWatchlist } from "../api/watchlistApi";

/**
 * Agregar un item a la watchlist
 * @param {string | undefined} profileId
 * @returns
 */
export const useRemoveFromWatchlist = (profileId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/**@type {string} */ movie_id) => {
      if (typeof profileId === "undefined")
        throw new Error("Se requiere un profile id");

      await removeFromWatchlist(profileId, movie_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist", profileId] });
    },
    onError: (error, variables) => {
      console.error(`Error removing movie ${variables} to watchlist:`, error);
    },
  });
};
