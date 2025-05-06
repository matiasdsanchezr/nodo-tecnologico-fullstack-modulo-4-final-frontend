import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfile } from "../api/profileApi";

/** Hook react-query para eliminar un perfil */
export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (/**@type {*} */ { activeProfileId, profileId }) => {
      await deleteProfile(activeProfileId, profileId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      console.error(`Error al crear nuevo perfil:`, error);
    },
  });
};
