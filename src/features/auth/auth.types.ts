import React, { Dispatch, useState } from "react";
import { Profile } from "../profiles/profiles.types";

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface UserData {
  id: string;
  email: string;
  username: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export type AuthErrorState = [
  ApiError | undefined,
  React.Dispatch<React.SetStateAction<ApiError | undefined>>
];

export type SelectedProfileState = [
  Profile | undefined,
  React.Dispatch<React.SetStateAction<Profile | undefined>>
];

export type AuthContextValue = {
  user?: UserData;
  profiles?: Profile[];
  selectedProfile?: Profile;
  isAuthReady: boolean;
  error?: ApiError;
  login: (credentials: UserCredentials) => Promise<void | ApiError>;
  logout: () => Promise<void>;
  selectProfile: (profileId: string) => void;
};

export type AuthContextComponent = React.Context<AuthContextValue | undefined>;

export type AuthProviderComponent = React.FunctionComponent<{
  children: React.ReactNode;
}>;
