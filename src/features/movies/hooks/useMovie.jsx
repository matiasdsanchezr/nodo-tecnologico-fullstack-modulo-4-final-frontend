// hooks/useMovieDetail.js
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetail } from "../api/moviesApi"; // Asegúrate de que la ruta sea correcta

/**
 * @import { UseQueryResult } from "@tanstack/react-query";
 * @import {Movie} from "@/features/movies/movies.types"
 */

/**
 * Hook para obtener los detalles de una pelicula
 * @param {string | undefined} movieId
 * @returns {UseQueryResult<Movie>}
 */
export const useMovieDetail = (movieId) => {
  const queryKey = ["movieDetail", movieId];

  const queryFn = () => fetchMovieDetail(movieId ?? "");

  const options = {
    enabled: !!movieId,
  };

  return useQuery({ queryKey, queryFn, ...options });
};
