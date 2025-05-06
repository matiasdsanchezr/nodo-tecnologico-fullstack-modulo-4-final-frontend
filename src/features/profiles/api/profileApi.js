import { api } from "@/features/shared/api/backendApi";

/**
 * Obtener una lista con todos los perfiles del usuario logeado
 */
export async function getProfiles() {
  const response = await api.get("/profiles", {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Fetch para crear un nuevo perfil
 * @param {string} activeProfileId
 * @param {any} profileData
 */
export async function createProfile(activeProfileId, profileData) {
  const response = await api.post("/profiles", profileData, {
    withCredentials: true,
    headers: { "Active-Profile-ID": activeProfileId },
  });
  return response.data;
}

/**
 * Fetch para actualizar los datos de un perfil
 * @param {string} activeProfileId
 * @param {string} profileId
 * @param {any} profileData
 */
export async function updateProfile(activeProfileId, profileId, profileData) {
  const response = await api.put(`/profiles/${profileId}`, profileData, {
    withCredentials: true,
    headers: { "Active-Profile-ID": activeProfileId },
  });
  return response.data;
}

/**
 * Fetch para eliminar un perfil
 * @param {string} activeProfileId
 * @param {string} profileId
 */
export async function deleteProfile(activeProfileId, profileId) {
  const response = await api.delete(`/profiles/${profileId}`, {
    withCredentials: true,
    headers: { "Active-Profile-ID": activeProfileId },
  });
  return response.data;
}
