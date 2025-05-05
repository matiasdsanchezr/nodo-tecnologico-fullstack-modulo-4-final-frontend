import { useNavigate } from "react-router-dom";
import { BsBookmarkFill, BsBookmarkPlus } from "react-icons/bs"; // Importa el icono de bookmark con '+'
import { useAuth } from "@/features/auth/context/AuthContext";
import { useWatchlist } from "@/features/watchlist/hooks/useWatchlist";
import { useAddToWatchlist } from "@/features/watchlist/hooks/useAddToWatchlist";
import { useRemoveFromWatchlist } from "@/features/watchlist/hooks/useRemoveFromWatchlist";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/** @import { Movie, MovieCardProps } from "@/features/movies/movies.types" */

/**
 * Card con informacion basica de una pelicula, incluyendo boton para agregar a watchlist.
 * @param {MovieCardProps } props
 */
export const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { selectedProfile } = useAuth();
  const { isInWatchlist } = useWatchlist(selectedProfile?.id);
  const { mutate: addToWatchlist } = useAddToWatchlist(selectedProfile?.id);
  const { mutate: removeFromWatchlist } = useRemoveFromWatchlist(
    selectedProfile?.id
  );

  const isFavorite = isInWatchlist(movie.id);

  return (
    <div
      className="text-black dark:text-dark-text-primary bg-bg-secondary dark:bg-dark-bg-secondary rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl relative cursor-pointer" // Agregamos 'relative' para posicionar el boton
    >
      <img
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={`Poster de ${movie.title}`}
        className="w-full h-auto object-cover"
        onClick={() => {
          navigate(`/movies/details/${movie.id}`);
        }}
      />
      <div
        className="p-4"
        onClick={() => {
          navigate(`/movies/details/${movie.id}`);
        }}
      >
        <h3 className="text-lg font-semibold truncate" title={movie.title}>
          {movie.title}
        </h3>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
          <span>
            {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
          </span>
          <span className="flex items-center">
            {/* Puedes reemplazar este SVG con un icono de react-icons si quieres consistencia */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-400 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {movie.vote_average.toFixed(1)}{" "}
          </span>
        </div>
      </div>

      {/* Botón de Watchlist - Cambia apariencia y acción según isInWatchlist */}
      <button
        type="button"
        className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition duration-200 z-10
          ${
            isFavorite
              ? "bg-green-600 text-white hover:bg-green-700" // Estilo si está en watchlist (verde)
              : "bg-blue-600 text-white hover:bg-blue-700" // Estilo si no está en watchlist (azul)
          }`}
        onClick={() => {
          isFavorite
            ? removeFromWatchlist(movie.id)
            : addToWatchlist({
                movie_id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                watched: false,
              });
        }}
        aria-label={
          isFavorite
            ? `Eliminar ${movie.title} de Watchlist`
            : `Agregar ${movie.title} a Watchlist`
        }
        title={
          isFavorite
            ? `Eliminar ${movie.title} de Watchlist`
            : `Agregar ${movie.title} a Watchlist`
        }
      >
        {isFavorite ? (
          <BsBookmarkFill size={20} />
        ) : (
          <BsBookmarkPlus size={20} />
        )}
      </button>
    </div>
  );
};
