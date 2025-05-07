import { Footer } from "@/layouts/Footer";
import { Header } from "@/layouts/Header";
import { usePaginatedMovies } from "../hooks/usePaginatedMovies";
import { LoadingPage } from "@/features/shared/pages/LoadingPage";
import { MoviesGrid } from "../components/MoviesGrid";
import { PaginationNav } from "../components/PaginationNav";
import { useWatchlist } from "@/features/watchlist/hooks/useWatchlist";
import { useAuth } from "@/features/auth/context/AuthContext";
import { ErrorPage } from "@/features/shared/pages/ErrorPage";

export const PopularMoviesPage = () => {
  const { selectedProfile } = useAuth();
  const {
    data,
    currentPage,
    isFetching: isFetchingMovies,
    goToPage,
  } = usePaginatedMovies(1);
  const { isInWatchlist, isLoading: isLoadingWatchlist } = useWatchlist(
    selectedProfile?.id
  );

  if (isFetchingMovies || isLoadingWatchlist) {
    return <LoadingPage message="Cargando peliculas..." />;
  }

  if (!data) {
    return <ErrorPage message="Error al cargar los recursos." />;
  }

  const movies = data.results.map((movie) => ({
    ...movie,
    isInWatchlist: isInWatchlist(movie.id),
  }));

  return (
    <>
      <Header />
      <main className="bg-bg-primary dark:bg-dark-bg-primary text-text-primary dark:text-dark-text-primary p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Contenedor para centrar y limitar ancho */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-red-500 pl-3">
            Películas Populares
          </h2>
          <MoviesGrid movies={movies} />
          {/* Botones de paginación */}
          {data && data.total_pages > 1 && (
            <PaginationNav
              totalPages={data.total_pages}
              currentPage={currentPage}
              onChangePage={goToPage}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
