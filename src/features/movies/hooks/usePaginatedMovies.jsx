import { api } from "@/features/shared/api/backendApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

/** @import { UsePopularMoviesType} from "@/features/movies/movies.types" */

/**
 * Hook personalizado para obtener el usuario actual
 * @param {number} page - Numero de pagine
 * @param {Object} options - Opciones adicionales para pasar a useQuery
 * @returns {UsePopularMoviesType} - Objeto con datos del usuario, estados de carga y error
 */
export const usePaginatedMovies = (page, options = {}) => {
  const [currentPage, setCurrentPage] = useState(page);

  const queryResult = useQuery({
    queryKey: ["movies", currentPage],
    queryFn: async () => {
      const response = await api.get("/movies", {
        withCredentials: true,
        params: { page: currentPage },
      });

      return response.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    ...options,
  });

  const totalPages = Math.min(queryResult.data?.total_pages, 500) || 0;

  const goToPage = (/** @type {Number} */ pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  // Función para ir a la página siguiente
  const goToNextPage = () => {
    if (queryResult.data && currentPage < queryResult.data.total_pages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return {
    ...queryResult,
    currentPage,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  };
};
