import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../api/authApi";

/**
 * Agregar un item a la watchlist
 * @returns
 */
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/**@type {*} */ userData) => {
      await registerUser(userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    onError: (error, variables) => {
      console.error(
        `Error registering user with data ${variables}:`,
        error
      );
    },
  });
};
