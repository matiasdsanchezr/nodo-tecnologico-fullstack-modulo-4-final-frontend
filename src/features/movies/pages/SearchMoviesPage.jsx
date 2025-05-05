import { Footer } from "@/layouts/Footer";
import { Header } from "@/layouts/Header";
import { FaSlidersH } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { SearchMoviesForm } from "../components/SearchMoviesForm";
import { MoviesGrid } from "../components/MoviesGrid";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { PaginationNav } from "../components/PaginationNav";

function SearchMoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, totalPages, currentPage } = useSearchMovies(searchParams);

  // Handler for form submission
  const handleSubmit = (/** @type {*} */ searchParams) => {
    setSearchParams(() => ({ ...searchParams, page: "1" }));
    return;

    // const criteria = {
    //   primary_release_year: year || undefined,
    //   sort_by: sortBy,
    //   "vote_average.gte": minRating || undefined,
    //   "vote_average.lte": maxRating || undefined,
    //   include_adult: includeAdult,
    // };

    // const cleanedCriteria = Object.fromEntries(
    //   Object.entries(criteria).filter(
    //     ([_, value]) => value !== undefined && value !== ""
    //   )
    // );

    // if (!includeAdult) {
    //   delete cleanedCriteria.include_adult;
    // }

    // console.log("Search Criteria:", cleanedCriteria); // Log criteria for debugging
  };

  const handlePageChange = (/** @type {number} */ page) => {
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

  return (
    <>
      <Header />
      <main className="flex-1 p-4 bg-bg-primary dark:bg-dark-bg-primary">
        {/* Card-like container for the form */}
        <div className="bg-bg-secondary dark:bg-dark-bg-secondary p-6 rounded-lg shadow-md max-w-xl m-auto">
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <FaSlidersH className="mr-3 text-text-primary dark:text-blue-400" />{" "}
            Búsqueda Avanzada de Películas
          </h2>
          <SearchMoviesForm onSubmit={handleSubmit} />
        </div>
        <section className="container m-auto">
          <h2 className="text-4xl font-bold text-center m-3">Resultados</h2>
          {data?.results && <MoviesGrid movies={data?.results} />}
          {!!totalPages && (
            <PaginationNav
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SearchMoviesPage;
