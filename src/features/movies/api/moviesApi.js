import { api } from "@/features/shared/api/backendApi";

/** Obtener una lista de peliculas
 * @param {number} page - Numero de pagina a cargar
 */
export async function getMovies(page) {
  const response = await api.get("/movies", {
    withCredentials: true,
    params: { page },
  });
  return response.data;
}

export const fetchMovieDetail = async (/** @type {string} */ movieId) => {
  if (!movieId) {
    throw new Error("Movie ID is required to fetch details");
  }

  const response = await api.get(`/movies/details/${movieId}`, {
    withCredentials: true,
  });

  return response.data; // Si llegamos aquí, fue exitoso (2xx)
};
