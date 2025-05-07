import { useWatchlist } from "../hooks/useWatchlist";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Header } from "@/layouts/Header";
import { Footer } from "@/layouts/Footer";
import { MovieCard } from "@/features/movies/components/MovieCard";
import { LoadingPage } from "@/features/shared/pages/LoadingPage";
import { ErrorPage } from "@/features/shared/pages/ErrorPage";

export const WatchlistPage = () => {
  const { selectedProfile } = useAuth();
  const {
    data: watchlist,
    isFetching,
    error,
  } = useWatchlist(selectedProfile?.id);

  if (isFetching) return <LoadingPage message="Cargando Mi lista..." />;

  if (error) {
    return <ErrorPage message="Se produjo un error al cargar Mi Lista." />;
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg-primary dark:bg-dark-bg-primary text-text-primary dark:text-dark-text-primary p-4 md:p-8">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-red-500 pl-3">
            Mi lista
          </h2>

          {watchlist && watchlist.length > 1 ? (
            // Lista de peliculas
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {watchlist?.map((watchlistItem) => (
                <MovieCard
                  key={watchlistItem.movie_id}
                  movie={{ ...watchlistItem, id: watchlistItem.movie_id }}
                />
              ))}
            </div>
          ) : (
            // Mensaje de error si la watchlist esta vacía
            <div className="grid gap-3 text-center">
              <h3 className="text-2xl font-bold">
                Tu lista de peliculas esta vacia.
              </h3>
              <p>
                Añade peliculas a tu lista para visualizarlas en esta sección.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
