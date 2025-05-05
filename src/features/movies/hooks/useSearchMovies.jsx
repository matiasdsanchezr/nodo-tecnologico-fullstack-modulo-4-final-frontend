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

  const queryKey = ["searchMovies", paramsObject];

  const hasSearchCriteria = Object.keys(paramsObject).some(
    (key) => key !== "page"
  );

  const queryResult = useQuery({
    queryKey: queryKey,
    // queryFn solo se ejecuta si enabled es true
    queryFn: async () => {
      // Incluimos todos los parámetros del searchParams object, incluyendo la página
      const response = await api.get("/movies/search", {
        withCredentials: true,
        params: paramsObject, // Usa el objeto params derivado de searchParams
      });
      console.log("API Response Data:", response.data);
      return response.data;
    },
    // Solo habilita la consulta si hay criterios de búsqueda presentes (más allá de la página)
    // y si searchParams no es nulo/indefinido.
    enabled: !!searchParams && hasSearchCriteria,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    ...options,
  });

  const totalPages = Math.min(queryResult.data?.total_pages || 0, 500); // Limitar total_pages si es necesario por la API o UX

  // No necesitamos funciones de paginación aquí, la página se cambia
  // actualizando el parámetro 'page' en la URL desde el componente page.

  return {
    ...queryResult,
    currentPage: page, // Exponemos la página actual derivada de la URL
    totalPages: totalPages,
  };
};
