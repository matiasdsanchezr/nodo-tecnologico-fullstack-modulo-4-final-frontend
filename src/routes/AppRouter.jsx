import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { MovieDetail } from "@/features/movies/pages/MovieDetailPage";
import { PopularMovies } from "@/features/movies/pages/PopularMoviesPage";
import { SearchMoviesPage } from "@/features/movies/pages/SearchMoviesPage";
import { ProfilesManagePage } from "@/features/profiles/pages/ProfilesManagePage";
import { SelectProfilePage } from "@/features/profiles/pages/ProfilesPage";
import { LandingPage } from "@/features/shared/pages/LandingPage";
import { NotFoundPage } from "@/features/shared/pages/NotFoundPage";
import { WatchlistPage } from "@/features/watchlist/pages/WatchlistPage";
import { Route, Routes } from "react-router-dom";
import { GuestRoute } from "@/routes/GuestRoute";
import { OwnerProtectedRoute } from "@/routes/OwnerProtectedRoute";
import { PrivateRoute } from "@/routes/PrivateRoute";
import { ProfileProtectedRoute } from "@/routes/ProfileProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<GuestRoute redirectPath="/profiles" />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Route>
      <Route element={<PrivateRoute redirectPath="/auth/login" />}>
        <Route path="/profiles" element={<SelectProfilePage />} />
      </Route>
      <Route element={<OwnerProtectedRoute redirectPath="/auth/login" />}>
        <Route path="/profiles/manage" element={<ProfilesManagePage />} />
      </Route>
      <Route element={<ProfileProtectedRoute redirectPath="/profiles" />}>
        <Route path="/movies" element={<PopularMovies />} />
        <Route path="/movies/popular" element={<PopularMovies />} />
        <Route path="/movies/details/:movieId" element={<MovieDetail />} />
        <Route path="/movies/search" element={<SearchMoviesPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export { AppRouter };
