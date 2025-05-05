import { UseQueryResult } from "@tanstack/react-query";
import { UserData } from "../auth/auth.types";

export interface Profile {
  id: string;
  user: string;
  name: string;
  role: any;
  avatar?: string;
}

export type UseProfile = (
  user: UserData | undefined,
  options?: Object
) => UseQueryResult<Profile[]>;
