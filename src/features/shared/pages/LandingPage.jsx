import { Footer } from "@/layouts/Footer/Footer";
import { Header } from "@/layouts/Header";
import { Link } from "react-router-dom";
import banner from "@/assets/banner.webp";

export const LandingPage = () => {
  return (
    <>
      <Header />
      <main className="grid flex-1 bg-bg-primary dark:bg-dark-bg-primary text-text-primary dark:text-dark-text-primary">
        <div
          id="hero"
          className="p-3 pt-32 grid gap-3 bg-center bg-no-repeat bg-cover text-white min-h-[50dvh]"
          style={{
            backgroundImage: `linear-gradient(to right bottom, #000a, #0006), url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg)`,
          }}
        >
          <div className="flex flex-col p-20 gap-3 max-w-5xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white font-cinematic">
              <span className="block text-primary">¡Acción!</span>
              Tu viaje cinematográfico comienza
            </h1>
            <p>
              Descubre un universo de historias donde cada película es una
              puerta a nuevas emociones. Desde clásicos atemporales hasta los
              estrenos más impactantes,{" "}
              <strong>
                tu próxima experiencia inolvidable está a un clic de distancia
              </strong>
              .
            </p>
          </div>
        </div>
        <div className="container p-3 mx-auto">
          <div className="text-center">
            <h2 className="text-2xl py-5">
              NODO Movies es el lugar de las grandes historias, los dramas
              intensos y las mejores comedias.
            </h2>
          </div>
          <div className="overflow-hidden rounded shadow">
            <img src={banner} alt="" />
          </div>
          <div className="max-w-sm m-auto p-3">
            <Link to="/auth/register" className="button text-center">
              Suscríbete ahora
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
