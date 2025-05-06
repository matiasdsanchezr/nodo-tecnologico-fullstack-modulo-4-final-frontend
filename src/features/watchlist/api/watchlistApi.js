import { api } from "@/features/shared/api/backendApi";

/** Obtener todos los elementos guardados en watchlist
 * @param {string} profileId
 */
export async function getWatchlist(profileId) {
  const response = await api.get("/watchlist", {
    headers: { "Active-Profile-ID": profileId },
    withCredentials: true,
  });
  return response.data;
}

/** Obtener todos los elementos guardados en watchlist
 * @param {string} profileId
 * @param {import("../watchlist.types").WatchlistItem} watchlistItem
 */
export async function addToWatchlist(profileId, watchlistItem) {
  const response = await api.post("/watchlist", watchlistItem, {
    headers: { "Active-Profile-ID": profileId },
    withCredentials: true,
  });
  return response.data;
}

/** Obtener todos los elementos guardados en watchlist
 * @param {string} profileId
 * @param {string} movie_id
 */
export async function removeFromWatchlist(profileId, movie_id) {
  const response = await api.delete(`/watchlist/${movie_id}`, {
    headers: { "Active-Profile-ID": profileId },
    withCredentials: true,
  });
  return response.data;
}
