import { api } from "@/features/shared/api/backendApi";

export async function getProfiles() {
  const response = await api.get("/profiles", {
    withCredentials: true,
  });
  return response.data;
}
