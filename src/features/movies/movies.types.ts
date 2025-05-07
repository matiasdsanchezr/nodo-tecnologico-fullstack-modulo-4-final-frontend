import { UseQueryResult } from "@tanstack/react-query";

export type Genre = {
  id: string;
  name: string;
};

export type Video = {
  key: string;
};

export type Movie = {
  id: string;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  tagline: string;
  genres: Genre[];
  runtime: number;
  overview: string;
  videos?: Video[];
};

export type MovieCardProps = {
  movie: {
    id: string;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    isInWatchlist: boolean;
  };
};

export type TmdbApiResponse = {
  total_pages: number;
  results: Movie[];
};

export type UsePopularMoviesType = UseQueryResult<TmdbApiResponse> & {
  currentPage: number;
  goToPage: (pageNumber: number) => void;
};

export type UseSearchMoviesType = UseQueryResult<TmdbApiResponse> & {
  currentPage: number;
  totalPages: number;
};
