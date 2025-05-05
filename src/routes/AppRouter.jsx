import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "@/features/shared/pages/LandingPage";
import GuestRoute from "./GuestRoute";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import NotFoundPage from "@/features/shared/pages/NotFoundPage";
import { PopularMovies } from "@/features/movies/pages/PopularMoviesPage";
import SelectProfilePage from "@/features/profiles/pages/ProfilesPage";
import ProfileProtectedRoute from "./ProfileProtectedRoute";
import MovieDetail from "@/features/movies/pages/MovieDetailPage";
import { WatchlistPage } from "@/features/watchlist/pages/WatchlistPage";
import SearchMoviesPage from "@/features/movies/pages/SearchMoviesPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <GuestRoute>
            <LandingPage />
          </GuestRoute>
        }
      />
      <Route
        path="/auth/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />
      <Route
        path="/auth/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />
      <Route
        path="/profiles"
        element={
          <PrivateRoute>
            <SelectProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/movies"
        element={
          <ProfileProtectedRoute>
            <PopularMovies />
          </ProfileProtectedRoute>
        }
      />
      <Route
        path="/movies/popular"
        element={
          <ProfileProtectedRoute>
            <PopularMovies />
          </ProfileProtectedRoute>
        }
      />
      <Route
        path="/movies/details/:movieId"
        element={
          <ProfileProtectedRoute>
            <MovieDetail />
          </ProfileProtectedRoute>
        }
      />
      <Route
        path="/movies/search"
        element={
          <ProfileProtectedRoute>
            <SearchMoviesPage/>
          </ProfileProtectedRoute>
        }
      />
      <Route
        path="/watchlist"
        element={
          <ProfileProtectedRoute>
            <WatchlistPage />
          </ProfileProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export { AppRouter };
