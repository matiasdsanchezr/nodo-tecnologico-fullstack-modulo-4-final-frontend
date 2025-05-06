import { api } from "@/features/shared/api/backendApi";
import { useQuery } from "@tanstack/react-query";

/** @import { UseSearchMoviesType} from "@/features/movies/movies.types" */

/**
 * Hook personalizado para obtener el usuario actual
 * @param {*} searchParams - Parametros de busqueda
 * @param {Object} options - Opciones adicionales para pasar a useQuery
 * @returns {UseSearchMoviesType} - Objeto con datos del usuario, estados de carga y error
 */
export const useSearchMovies = (searchParams, options = {}) => {
  const page = parseInt(searchParams.get("page") || "1", 10);
  const paramsObject = Object.fromEntries(searchParams.entries());
  const hasSearchCriteria = Object.keys(paramsObject).some(
    (key) => key !== "page"
  );

  const queryResult = useQuery({
    queryKey: ["searchMovies", paramsObject],
    queryFn: async () => {
      const response = await api.get("/movies/search", {
        withCredentials: true,
        params: paramsObject,
      });
      return response.data;
    },
    enabled: !!searchParams && hasSearchCriteria,
    retry: false,
    staleTime: 1000 * 60 * 5,
    ...options,
  });

  const totalPages = Math.min(queryResult.data?.total_pages || 0, 500);

  return {
    ...queryResult,
    currentPage: page,
    totalPages: totalPages,
  };
};
