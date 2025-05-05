import { Footer } from "@/layouts/Footer";
import { Header } from "@/layouts/Header";
import { Link } from "react-router-dom";

/**
 * Pagina de carga
 * @param {{message: string}} loadingPageProps
 * @returns
 */
export const LoadingPage = ({ message }) => {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col gap-5 justify-center items-center bg-bg-primary dark:bg-dark-bg-primary">
        <h2 className="text-4xl">{message}</h2>
      </main>
      <Footer />
    </>
  );
};

export default LoadingPage;
