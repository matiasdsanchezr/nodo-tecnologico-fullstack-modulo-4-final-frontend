import { api } from "@/features/shared/api/backendApi";

/** @import {UserCredentials, UserData} from "@/features/auth/auth.types" */

/**
 * Intenta autenticar un usuario con las credenciales proporcionadas y
 * establece las cookies con el authToken correspondiente.
 * @param {*} userData - Credenciales del usuario
 * @returns {Promise<UserData>} Respuesta del servidor
 * @throws {Error} Cuando falla la autenticación o hay problemas de red
 */
export async function registerUser(userData) {
  const response = await api.post("/auth/register", userData, {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Intenta autenticar un usuario con las credenciales proporcionadas y
 * establece las cookies con el authToken correspondiente.
 * @param {UserCredentials} credentials - Credenciales del usuario
 * @returns {Promise<UserData>} Respuesta del servidor
 * @throws {Error} Cuando falla la autenticación o hay problemas de red
 */
export async function loginUser(credentials) {
  const response = await api.post("/auth/login", credentials, {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Intenta cerrar la sesión del usuario actual y limpiar el auth token
 * de las cookies
 * @returns {Promise<void>} Respuesta del servidor
 * @throws {Error} Cuando falla la autenticación o hay problemas de red
 */
export async function logoutUser() {
  const response = await api.get("/auth/logout", {
    withCredentials: true,
  });
  return response.data;
}

/**
 * Intenta cargar la informacion del usuario actual a partir del token
 * almacenado en las cookies
 * @returns {Promise<UserData>} Respuesta del servidor
 * @throws {Error} Cuando falla la autenticación o hay problemas de red
 */
export async function getCurrentUser() {
  const response = await api.get("/auth/me", {
    withCredentials: true,
  });
  return response.data;
}
