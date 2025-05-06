import { useState } from "react";
import { useCreateProfile } from "../hooks/useCreateProfile";
import { useAuth } from "@/features/auth/context/AuthContext";

/**
 * @typedef {Object} ProfileEditForm
 * @property {any} profile
 * @property {()=>void} onSubmit
 */

/**
 *
 * @returns
 */
export const CreateProfileForm = () => {
  const { selectedProfile } = useAuth();
  const { mutate: createProfile } = useCreateProfile(selectedProfile?.id);
  const [name, setName] = useState("");
  const [type, setType] = useState("standard");

  // @ts-ignore
  const handleOnSubmit = (e) => {
    e.preventDefault();
    createProfile({ name, type });
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Añadir Perfil</h2>
      <form
        className="flex flex-col justify-center gap-3 bg-bg-secondary dark:bg-dark-bg-secondary p-3 rounded"
        onSubmit={handleOnSubmit}
      >
        <fieldset className="grid gap-2">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            className="input"
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
          />
        </fieldset>
        <fieldset className="grid gap-2">
          <label htmlFor="role">Tipo de Perfil</label>
          <select
            id="role"
            name="role"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input"
          >
            <option value="standard">Adulto</option>
            <option value="kid">Niño</option>
          </select>
        </fieldset>

        <button type="submit" className="button">
          Añadir
        </button>
      </form>
    </>
  );
};
