import { Header } from "@/layouts/Header";
import { Footer } from "@/layouts/Footer/Footer";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, isAuthReady, error: loginError } = useAuth();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-bg-primary dark:bg-dark-bg-primary">
        <div className="p-3 md:p-5 flex-1 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 container max-w-lg m-auto p-6 rounded-lg shadow-xl bg-bg-secondary dark:bg-dark-bg-secondary" // Increased gap, padding, added shadow
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              Iniciar Sesión
            </h2>
            {/* Display login error from the auth context */}
            {loginError && (
              <p className="text-red-400 text-center font-semibold">
                Credenciales invalidas
              </p>
            )}
            <fieldset className="grid gap-2">
              <label htmlFor="email">Correo electrónico</label>{" "}
              <input
                type="text"
                id="email"
                className={`input ${
                  errors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
                {...register("email", {
                  required: "El correo electrónico es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Formato de correo no válido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-400 text-sm">
                  {errors.email.message}
                </span>
              )}
            </fieldset>
            <fieldset className="grid gap-2">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                className={`input ${
                  errors.password ? "border-red-500 focus:border-red-500" : ""
                }`}
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-400 text-sm">
                  {errors.password.message}
                </span>
              )}
            </fieldset>
            <button
              type="submit"
              disabled={!isAuthReady}
              className={`button mx-auto w-full max-w-xs py-2 px-4 rounded transition duration-200 ${
                !isAuthReady
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {!isAuthReady ? "Ingresando..." : "Ingresar"}{" "}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};
