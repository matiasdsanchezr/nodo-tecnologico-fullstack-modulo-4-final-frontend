import { useAuth } from "@/features/auth/context/AuthContext";
import { LoadingPage } from "@/features/shared/pages/LoadingPage";
import { useWatchlist } from "@/features/watchlist/hooks/useWatchlist";
import { Footer } from "@/layouts/Footer";
import { Header } from "@/layouts/Header";
import { FaSlidersH } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { MoviesGrid } from "../components/MoviesGrid";
import { PaginationNav } from "../components/PaginationNav";
import { SearchMoviesForm } from "../components/SearchMoviesForm";
import { useSearchMovies } from "../hooks/useSearchMovies";

export const SearchMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedProfile } = useAuth();
  const { data, totalPages, currentPage, isFetching } =
    useSearchMovies(searchParams);
  const { isInWatchlist } = useWatchlist(selectedProfile?.id);

  const handleOnChangePage = (/** @type {number} */ page) => {
    setSearchParams((prevSearchParams) => {
      const currentParamsAsObject = Object.fromEntries(
        prevSearchParams.entries()
      );
      return {
        ...currentParamsAsObject,
        page: String(page),
      };
    });
  };

  if (isFetching) return <LoadingPage message="Cargando peliculas..." />;

  const movies = data?.results.map((movie) => ({
    ...movie,
    isInWatchlist: isInWatchlist(movie.id),
  }));

  return (
    <>
      <Header />
      <main className="flex-1 p-4 bg-bg-primary dark:bg-dark-bg-primary">
        {/* Buscador */}
        <div className="bg-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg shadow-md max-w-xl m-auto">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <FaSlidersH className="mr-3 text-text-primary dark:text-blue-400" />{" "}
            Búsqueda Avanzada de Películas
          </h2>
          <SearchMoviesForm />
        </div>
        {movies && (
          <section className="container m-auto">
            <h2 className="text-4xl font-bold text-center m-3">Resultados</h2>
            <MoviesGrid movies={movies} />
            {/* Botones de nevegación */}
            {!!totalPages && (
              <PaginationNav
                totalPages={totalPages}
                currentPage={currentPage}
                onChangePage={handleOnChangePage}
              />
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};
