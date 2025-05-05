import React from "react";
import { MovieCard } from "./MovieCard";

/**
 *
 * @param {*} props
 * @returns
 */
export const MoviesGrid = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
      {movies.map((/** @type {*} */ movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
