// hooks/useMovieDetail.js
import { useQuery } from "@tanstack/react-query";
import { getWatchlist } from "../api/watchlistApi"; // Asegúrate de que la ruta sea correcta
import { useCallback, useMemo } from "react";

/**
 * @import { WatchlistItem, UseWatchlistValue } from "@/features/watchlist/watchlist.types"
 */

/**
 * Hook para obtener los detalles de una pelicula
 * @param {string | undefined} profileId
 * @returns {UseWatchlistValue}
 */
export const useWatchlist = (profileId) => {
  const queryKey = ["watchlist", profileId];
  const queryFn = () => getWatchlist(profileId ?? "");
  const options = {
    enabled: !!profileId,
  };

  const queryResult = useQuery({ queryKey, queryFn, ...options });

  /** @type { WatchlistItem[]} */
  const data = queryResult.data;

  const watchlistMap = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return {};
    }

    /** @type {Record<string, WatchlistItem>} */
    const map = {};
    data.forEach((item) => {
      map[String(item.movie_id)] = item;
    });

    return map;
  }, [data]);

  const isInWatchlist = useCallback(
    /** @param {string | number} movieId El ID de la película a buscar. */
    (movieId) => {
      if (!watchlistMap) return false;
      return !!watchlistMap[String(movieId)];
    },
    [watchlistMap]
  );

  return { ...queryResult, isInWatchlist };
};
