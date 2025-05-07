import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";
import { FaCalendarAlt, FaSearch, FaSort, FaStar } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const genresList = [
  {
    id: 0,
    name: "Sin especificar",
  },
  {
    id: 28,
    name: "Acción",
  },
  {
    id: 12,
    name: "Aventura",
  },
  {
    id: 16,
    name: "Animación",
  },
  {
    id: 35,
    name: "Comedia",
  },
  {
    id: 80,
    name: "Crimen",
  },
  {
    id: 99,
    name: "Documental",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Familia",
  },
  {
    id: 14,
    name: "Fantasía",
  },
  {
    id: 36,
    name: "Historia",
  },
  {
    id: 27,
    name: "Terror",
  },
  {
    id: 10402,
    name: "Música",
  },
  {
    id: 9648,
    name: "Misterio",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Ciencia ficción",
  },
  {
    id: 10770,
    name: "Película de TV",
  },
  {
    id: 53,
    name: "Suspense",
  },
  {
    id: 10752,
    name: "Bélica",
  },
  {
    id: 37,
    name: "Western",
  },
];

/**
 *
 * @returns
 */
export const SearchMoviesForm = () => {
  const { selectedProfile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [year, setYear] = useState(
    searchParams.get("primary_release_year") ?? undefined
  );
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort_by") ?? undefined
  );
  const [minRating, setMinRating] = useState(
    searchParams.get("vote_average_gte") ?? undefined
  );
  const [maxRating, setMaxRating] = useState(
    searchParams.get("vote_average_lte") ?? undefined
  );
  const [includeAdult, setIncludeAdult] = useState(
    searchParams.get("includeAdult") === "true"
  );
  const [genre, setGenre] = useState(searchParams.get("genre") ?? undefined);

  const handleSubmit = (/** @type {any} */ e) => {
    e.preventDefault();
    const criteria = {
      genre: genre ?? undefined,
      primary_release_year: year,
      vote_average_gte: minRating,
      vote_average_lte: maxRating,
      includeAdult: includeAdult || undefined,
      sort_by: sortBy,
    };

    const cleanedCriteria = Object.fromEntries(
      Object.entries(criteria).filter(
        // eslint-disable-next-line no-unused-vars
        ([_, value]) => value !== undefined && value !== ""
      )
    );

    setSearchParams(() => ({ ...cleanedCriteria, page: "1" }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Field: Year */}
      <div>
        <label htmlFor="year" className="text-sm font-medium flex items-center">
          <FaCalendarAlt className="mr-2 text-gray-500" /> Año de Lanzamiento:
        </label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="mt-1 block w-full rounded-md bg-bg-primary dark:bg-gray-700 border-gray-600 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Ej: 2023"
          min="1888" // First movie year? Or maybe 1900?
          max={new Date().getFullYear()} // Don't allow future years
        />
      </div>
      {/* Field: Sort By */}
      <div>
        <label
          htmlFor="sortBy"
          className="text-sm font-medium flex items-center"
        >
          <FaSort className="mr-2 text-gray-400" /> Ordenar por:
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="mt-1 block w-full rounded-md bg-bg-primary dark:bg-gray-700 border-gray-600 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="popularity.desc">Popularidad (Desc)</option>
          <option value="popularity.asc">Popularidad (Asc)</option>
          <option value="release_date.desc">Fecha de Lanzamiento (Desc)</option>
          <option value="release_date.asc">Fecha de Lanzamiento (Asc)</option>
          <option value="revenue.desc">Recaudación (Desc)</option>
          <option value="revenue.asc">Recaudación (Asc)</option>
          <option value="vote_average.desc">Promedio de Votos (Desc)</option>
          <option value="vote_average.asc">Promedio de Votos (Asc)</option>
        </select>
      </div>
      {/* Field: Minimum Rating */}
      <div>
        <label
          htmlFor="minRating"
          className="text-sm font-medium flex items-center"
        >
          <FaStar className="mr-2 text-gray-400" /> Calificación Mínima:
        </label>
        <input
          type="number"
          id="minRating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="mt-1 block w-full rounded-md bg-bg-primary dark:bg-gray-700 border-gray-600 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Ej: 7.5"
          min="0"
          max="10"
          step="0.1"
        />
      </div>
      {/* Field: Maximum Rating  */}
      <div>
        <label
          htmlFor="maxRating"
          className="text-sm font-medium flex items-center"
        >
          <FaStar className="mr-2 text-gray-400" /> Calificación Máxima:
        </label>
        <input
          type="number"
          id="maxRating"
          value={maxRating}
          onChange={(e) => setMaxRating(e.target.value)}
          className="mt-1 block w-full rounded-md bg-bg-primary dark:bg-gray-700 border-gray-600 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Ej: 9.0"
          min="0"
          max="10"
          step="0.1"
        />
      </div>
      {/* Field: Genres */}
      <div>
        <label
          htmlFor="genres"
          className="text-sm font-medium flex items-center"
        >
          <FaStar className="mr-2 text-gray-400" /> Género
        </label>
        <select
          id="genres"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="mt-1 block w-full rounded-md bg-bg-primary dark:bg-gray-700 border-gray-600 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {genresList.map((genre) => (
            <option key={genre.id} value={genre.id} defaultValue={28}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      {/* Field: Include Adult */}
      <div className="flex items-center md:col-span-2">
        <input
          type="checkbox"
          id="includeAdult"
          checked={includeAdult}
          onChange={(e) => setIncludeAdult(e.target.checked)}
          className="h-4 w-4 text-blue-600 border-gray-600 rounded focus:ring-blue-500"
        />
        {selectedProfile?.role.name != "kid" && (
          <label
            htmlFor="includeAdult"
            className="ml-2 block text-sm font-medium"
          >
            Incluir contenido para adultos
          </label>
        )}
      </div>
      {/* Submit Button */}
      <div className="md:col-span-2 flex justify-center mt-4">
        <button
          type="submit"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaSearch className="-ml-1 mr-3 h-5 w-5" />
          Buscar Películas
        </button>
      </div>
    </form>
  );
};
