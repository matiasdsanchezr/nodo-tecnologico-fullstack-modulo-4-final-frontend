import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "../api/profileApi";

/** @import { UseProfile} from "@/features/profiles/profiles.types" */

/** @type UseProfile */
export const useProfiles = (user, options = {}) => {
  const queryResult = useQuery({
    queryKey: ["profiles"],
    queryFn: getProfiles,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!user,
    ...options,
  });
  return queryResult;
};

export default useProfiles;
