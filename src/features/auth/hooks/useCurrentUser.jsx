import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/authApi"; // Ajusta la ruta según tu estructura de proyecto

/**
 * @import {UseQueryResult} from "@tanstack/react-query"
 * @import {UserData} from "@/features/auth/auth.types"
 */

/**
 * Hook personalizado para obtener el usuario actual
 * @param {Object} options - Opciones adicionales para pasar a useQuery
 * @returns {UseQueryResult<UserData>} - Objeto con datos del usuario, estados de carga y error
 */
export const useCurrentUser = (options = {}) => {
  const queryResult = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    ...options,
  });

  return queryResult;
};

export default useCurrentUser;
