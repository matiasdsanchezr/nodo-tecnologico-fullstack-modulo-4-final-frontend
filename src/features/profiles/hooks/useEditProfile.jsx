import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/profileApi";

/**
 * Editar un perfil
 * @returns
 */
export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/** @type {*} */ mutationData) => {
      await updateProfile(
        mutationData.activeProfileId,
        mutationData.profileId,
        mutationData.profileData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      console.error(`Error al editar el perfil:`, error);
    },
  });
};
