import React from "react";
import { useWatchlist } from "../hooks/useWatchlist";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Header } from "@/layouts/Header";
import { Footer } from "@/layouts/Footer";
import { MovieCard } from "@/features/movies/components/MovieCard";

export const WatchlistPage = () => {
  const { selectedProfile } = useAuth();
  const { data } = useWatchlist(selectedProfile?.id);

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg-primary dark:bg-dark-bg-primary text-text-primary dark:text-dark-text-primary p-4 md:p-8">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 border-l-4 border-red-500 pl-3">
            Mi lista
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {data?.map((watchlistItem) => (
              <MovieCard
                key={watchlistItem.movie_id}
                movie={{ ...watchlistItem, id: watchlistItem.movie_id }}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
