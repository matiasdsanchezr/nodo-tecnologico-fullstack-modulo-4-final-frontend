import { useState } from "react";
import { useForm } from "react-hook-form";
import { Header } from "@/layouts/Header";
import { useRegister } from "../hooks/useRegister";
import { Footer } from "@/layouts/Footer";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const { mutate: registerUser, isPending, error: apiError } = useRegister();

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = (data) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    const { repassword, ...formDataToSend } = data;

    registerUser(formDataToSend, {
      onSuccess: () => {
        setSubmitSuccess(true);
        setSubmitError(null);
        reset();
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Error desconocido al registrar";
        setSubmitError(errorMessage);
        setSubmitSuccess(false);
      },
    });
  };

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col bg-bg-primary dark:bg-dark-bg-primary">
        <section className="container m-auto flex-1 flex flex-col justify-center p-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="m-auto flex flex-col gap-3 w-full max-w-lg bg-bg-secondary dark:bg-dark-bg-secondary p-3 md:p-8 rounded-lg shadow-xl"
          >
            <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>{" "}
            {submitSuccess && (
              <p className="text-green-400 text-center font-semibold">
                ¡Registro completado con éxito!
              </p>
            )}
            {submitError && (
              <p className="text-red-400 text-center font-semibold">
                {submitError}
              </p>
            )}
            {apiError && !submitError && (
              <p className="text-red-400 text-center font-semibold">
                Error de conexión: {apiError.message}
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
              {/* Display error message */}
              {errors.email && (
                <span className="text-red-400 text-sm">
                  {errors.email.message}
                </span>
              )}
            </fieldset>
            <fieldset className="grid gap-2">
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                className={`input ${
                  errors.username ? "border-red-500 focus:border-red-500" : ""
                }`}
                {...register("username", {
                  required: "El nombre de usuario es requerido",
                  minLength: {
                    value: 3,
                    message:
                      "El nombre de usuario debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message:
                      "El nombre de usuario no debe exceder los 20 caracteres",
                  },
                })}
              />
              {errors.username && (
                <span className="text-red-400 text-sm">
                  {errors.username.message}
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
                  validate: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_-]).{8,}$/.test(
                      value
                    ) ||
                    "La contraseña no es segura. Debe contener un minimo de 8 caracteres con una minuscula, una mayuscula y un caracterer especial.",
                })}
              />
              {errors.password && (
                <span className="text-red-400 text-sm">
                  {errors.password.message}
                </span>
              )}
            </fieldset>
            <fieldset className="grid gap-2">
              <label htmlFor="repassword">Repetir contraseña</label>{" "}
              <input
                type="password"
                id="repassword"
                className={`input ${
                  errors.repassword ? "border-red-500 focus:border-red-500" : ""
                }`}
                {...register("repassword", {
                  required: "Por favor, repite la contraseña",
                  validate: (value) =>
                    value === getValues("password") ||
                    "Las contraseñas no coinciden",
                })}
              />
              {errors.repassword && (
                <span className="text-red-400 text-sm">
                  {errors.repassword.message}
                </span>
              )}
            </fieldset>
            <button
              type="submit"
              className={`button mx-auto w-full max-w-xs py-2 px-4 rounded transition duration-200 ${
                isPending
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isPending}
            >
              {isPending ? "Registrando..." : "Registrarse"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};
