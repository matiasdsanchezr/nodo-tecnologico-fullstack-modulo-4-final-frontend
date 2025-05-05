import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser } from "@/features/auth/api/authApi";
import useCurrentUser from "../hooks/useCurrentUser";
import useProfiles from "@/features/profiles/hooks/useProfiles";
import { useNavigate } from "react-router-dom";
import LoadingPage from "@/features/shared/pages/LoadingPage";

/**
 * Importar definiciones de tipos
 * @import {AuthContextValue, AuthProviderComponent, AuthContextComponent, SelectedProfileState, UserCredentials, AuthErrorState} from "../auth.types"
 */

/** @type {AuthContextComponent} */ // @ts-ignore
const AuthContext = createContext(undefined);

/** @type {AuthProviderComponent} */
export const AuthProvider = ({ children }) => {
  /** @type {AuthErrorState} */
  const [error, setError] = useState();
  /** @type {SelectedProfileState} */
  const [selectedProfile, setSelectedProfile] = useState();
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Cargar usuario y perfiles usando React Query
  const {
    data: user,
    isFetched: isUserFetched,
    isError: isUserError,
  } = useCurrentUser();
  const {
    data: profiles,
    isFetched: isProfilesFetched,
    isError: isProfileError,
  } = useProfiles(user);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // Intentar cargar perfil previamente seleccionado desde el local storage
  useEffect(() => {
    if (isUserError || isProfileError) {
      setIsAuthReady(true);
      setSelectedProfile(undefined);
    }

    if (!isUserFetched || !isProfilesFetched) {
      return;
    }

    if (profiles) {
      const storedProfileId = localStorage.getItem("profileId");
      let foundProfile = undefined;
      if (storedProfileId) {
        foundProfile = profiles.find(
          (profile) => profile.id == storedProfileId
        );
        if (!foundProfile) {
          localStorage.removeItem("profileId");
        }
      }

      setSelectedProfile(foundProfile);
    } else {
      setSelectedProfile(undefined);
      localStorage.removeItem("profileId");
    }

    setIsAuthReady(true);
  }, [isUserFetched, isProfilesFetched, profiles, isUserError, isProfileError]);

  // React Query - Mutación para el login
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (userData) => {
      queryClient.setQueryData(["currentUser"], userData);
      setError(undefined);
    },
    onError: (/** @type{any} */ error) => {
      setError({
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      setIsAuthReady(true);
    },
  });

  // React Query - Mutación para el logout
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      queryClient.clear();
      localStorage.removeItem("profileId");
      setSelectedProfile(undefined);
      setIsAuthReady(false);
    },
  });

  const login = useCallback(
    async (/** @type {UserCredentials} */ credentials) => {
      setIsAuthReady(false);
      await loginMutation.mutateAsync(credentials);
    },
    [loginMutation]
  );

  const logout = useCallback(async () => {
    setIsAuthReady(false);
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const selectProfile = useCallback(
    async (/** @type {string} */ profileId) => {
      const profile = profiles?.find((profile) => profile.id == profileId);
      setSelectedProfile(profile);
      if (profile) {
        localStorage.setItem("profileId", profile.id);
      } else {
        localStorage.removeItem("profileId");
      }
      return navigate("/movies");
    },
    [profiles, navigate]
  );

  const value = useMemo(
    () => ({
      user,
      profiles: profiles,
      selectedProfile,
      isAuthReady,
      error,
      selectProfile,
      login,
      logout,
    }),
    [
      user,
      profiles,
      selectedProfile,
      isAuthReady,
      error,
      selectProfile,
      login,
      logout,
    ]
  );

  return (
    <AuthContext value={value}>
      {!isAuthReady ? (
        <LoadingPage message={"Cargando usuario..."} />
      ) : (
        children
      )}
    </AuthContext>
  );
};

/**
 * Hook para acceder al contexto de autenticación
 * @returns {AuthContextValue} Valores del contexto de autenticación
 * @throws {Error} Si se usa fuera de un AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
