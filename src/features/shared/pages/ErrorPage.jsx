import { Footer } from "@/layouts/Footer";
import { Header } from "@/layouts/Header";
import { Link } from "react-router-dom";

/**
 * Pagina para mostrar cuando se produce un error mientras se carga un recurso
 * @param {{message: string}} props
 * @returns
 */
export const ErrorPage = ({ message }) => {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col gap-5 justify-center items-center">
        <h2 className="text-4xl">Error al cargar</h2>
        <p>Ocurrio un error al cargar el recurso solicitado</p>
        <p>{message}</p>
        <Link to={"/"} className="button">
          Volver a inicio
        </Link>
      </main>
      <Footer />
    </>
  );
};
