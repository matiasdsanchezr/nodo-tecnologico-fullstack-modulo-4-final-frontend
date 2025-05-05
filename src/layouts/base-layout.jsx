import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer/Footer";

export const BaseLayout = () => {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
