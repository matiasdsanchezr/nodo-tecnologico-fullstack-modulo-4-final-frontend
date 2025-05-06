import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "../api/profileApi";

/**
 * Hook react-query para crear un nuevo perfil
 * @param {* | undefined} activeProfileId
 * @returns
 */
export const useCreateProfile = (activeProfileId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/**@type {*} */ profileData) => {
      if (!activeProfileId) {
        throw new Error("Se requiere un perfil activo");
      }
      await createProfile(activeProfileId, profileData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      console.error(`Error al crear nuevo perfil:`, error);
    },
  });
};
