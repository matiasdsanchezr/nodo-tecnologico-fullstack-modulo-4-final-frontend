import { Footer } from "@/layouts/Footer";
import { Header } from "@/layouts/Header";
import { useParams } from "react-router";
import { useMovieDetail } from "../hooks/useMovie";
import { LoadingPage } from "@/features/shared/pages/LoadingPage";
import { ErrorPage } from "@/features/shared/pages/ErrorPage";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";

export const MovieDetail = () => {
  const { movieId } = useParams();
  const { data: movie, isLoading: loading, error } = useMovieDetail(movieId);

  if (loading) {
    return <LoadingPage message={"Cargando detalles de la película..."} />;
  }

  if (error || !movie) {
    return (
      <ErrorPage message="Se produjo un error al cargar los detalles de la pelicula" />
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg-primary dark:bg-dark-bg-primary">
        <section
          className="relative overflow-hidden bg-cover bg-center bg-no-repeat backdrop-brightness-50"
          style={{
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${IMAGE_BASE_URL}/original/${movie.backdrop_path})`,
          }}
        >
          <div className="text-white container mx-auto p-4 py-16 flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Póster */}
            <div className="md:w-1/3 flex justify-center z-10">
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                  alt={`Póster de ${movie.title}`}
                  className="rounded-lg shadow-lg w-full max-w-xs md:max-w-sm object-cover"
                  style={{ minWidth: "200px" }} // Evita que se haga demasiado pequeño
                />
              ) : (
                <div className="w-full max-w-xs md:max-w-sm h-auto bg-gray-200 flex items-center justify-center rounded-lg text-gray-500 text-center p-4">
                  No hay póster disponible
                </div>
              )}
            </div>
            {/* Detalles de la película */}
            <div className="md:w-2/3">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {movie.title}
                {movie.release_date && (
                  <span className="text-xl md:text-2xl font-normal ml-3">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                )}
              </h1>
              {movie.tagline && (
                <p className="text-xl italic mb-4">"{movie.tagline}"</p>
              )}
              {/* Géneros */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="mb-4">
                  <span className="font-semibold">Géneros: </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-blue-200 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Información adicional */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-sm">
                {movie.vote_average > 0 && (
                  <div>
                    <span className="font-semibold">Puntuación: </span>
                    {movie.vote_average.toFixed(1)} / 10
                  </div>
                )}
                {movie.runtime > 0 && (
                  <div>
                    <span className="font-semibold">Duración: </span>
                    {movie.runtime} min
                  </div>
                )}
                {movie.release_date && (
                  <div>
                    <span className="font-semibold">Lanzamiento: </span>
                    {new Date(movie.release_date).toLocaleDateString("es-ES")}
                  </div>
                )}
              </div>
              {/* Sinopsis / Overview */}
              {movie.overview ? (
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-3">Sinopsis</h2>
                  <p className="leading-relaxed">{movie.overview}</p>
                </div>
              ) : (
                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-3">
                    No hay sinopsis disponible
                  </h2>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* Seccion Trailer */}
        <section className="my-8 flex flex-col gap-3 justify-center items-center">
          {movie.videos && movie.videos.length > 0 ? (
            <>
              <h2 className="text-4xl font-bold">Trailer</h2>
              {/* eslint-disable-next-line react-dom/no-missing-iframe-sandbox */}
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${movie.videos[0].key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full max-w-2xl aspect-video h-auto px-3"
              ></iframe>
            </>
          ) : (
            <h2 className="text-4xl font-bold">Trailer no disponible</h2>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};
