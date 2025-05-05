import { UseQueryResult } from "@tanstack/react-query";

export type WatchlistItem = {
  movie_id: string;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  watched: boolean;
};

export type UseWatchlistValue = UseQueryResult<WatchlistItem[]> & {
  isInWatchlist: (movieId: string | number) => boolean;
};
