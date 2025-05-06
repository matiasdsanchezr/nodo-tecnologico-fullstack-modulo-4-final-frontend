import { Footer } from "@/layouts/Footer";
import { Header } from "@/layouts/Header";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col gap-5 justify-center items-center">
        <h2 className="text-4xl">Pagina no encontrada</h2>
        <p>La pagina a la que intentas acceder no esta disponible.</p>
        <Link to={"/"} className="button">
          Volver a inicio
        </Link>
      </main>
      <Footer />
    </>
  );
};
