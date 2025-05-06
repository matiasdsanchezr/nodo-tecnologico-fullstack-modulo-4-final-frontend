import { useAuth } from "@/features/auth/context/AuthContext";
import { useEffect } from "react"; // Mantenemos useEffect para resetear el formulario
import { useEditProfile } from "../hooks/useEditProfile";
import { useDeleteProfile } from "../hooks/useDeleteProfile";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

/**
 * Componente de formulario para editar un perfil.
 * @param {object} props
 * @param {import("../profiles.types").Profile} props.profile - El objeto perfil actual que se está editando.
 */
export const ProfileEditForm = ({ profile }) => {
  const { selectedProfile, profiles } = useAuth();
  const { mutate: editProfile, isPending: isEditing } = useEditProfile();
  const { mutate: deleteProfile, isPending: isDeleting } = useDeleteProfile();
  const isLoading = isEditing || isDeleting;

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: profile.name,
      type: profile.role.name,
    },
  });

  useEffect(() => {
    reset({
      name: profile.name,
      type: profile.role.name,
    });
  }, [profile, reset]);

  const onSubmit = (data) => {
    if (data.type == "owner") data.type = "standard";
    editProfile({
      activeProfileId: selectedProfile?.id,
      profileId: profile.id,
      profileData: { name: data.name, type: data.type },
    });
  };

  const handleClickDelete = () => {
    Swal.fire({
      title: `Estas por eliminar el perfil con nombre "${profile.name}". Ingresa el nombre para confirmar.`,
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: `Cancelar`,
      confirmButtonColor: "#f87171",
      customClass: {
        confirmButton: "button !bg-red-400 hover:!bg-red-500",
        cancelButton: "button",
      },
      preConfirm: (input) => {
        if (input !== profile.name) {
          Swal.showValidationMessage(
            "Error. Ingresa el nombre exacto del perfil a eliminar."
          );
          return false;
        }
        return input;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if (!deleteProfile || !selectedProfile) {
          console.error(
            "Delete profile function or selected profile not available."
          );
          Swal.fire("Error", "No se pudo eliminar el perfil.", "error");
          return;
        }
        // Llama a la mutación de eliminación y maneja el resultado en sus callbacks
        deleteProfile(
          {
            activeProfileId: selectedProfile?.id,
            profileId: profile.id,
          },
          {
            onSuccess: () => {
              Swal.fire("Perfil Eliminado!", "", "success");
            },
            onError: (error) => {
              Swal.fire("Error", "No se pudo eliminar el perfil.", "error");
              console.error("Error deleting profile:", error);
            },
          }
        );
      }
    });
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Editar Perfil</h2>
      <form
        className="flex flex-col justify-center gap-3 p-3 bg-bg-secondary dark:bg-dark-bg-secondary"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className="grid gap-2">
          <label htmlFor="name">Nombre de usuario</label>
          <input
            id="name"
            type="text"
            className={`input ${errors.name ? "border-red-500" : ""}`}
            {...register("name", {
              required: "El nombre de usuario es requerido",
              validate: (value) => {
                const isNameTaken = profiles?.some(
                  (p) => p.id !== profile.id && p.name === value
                );
                return isNameTaken ? "Este nombre de perfil ya existe" : true;
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </fieldset>

        {profile.role.name != "owner" && (
          <fieldset className="grid gap-2">
            <label htmlFor="type">Tipo de usuario</label>
            <select
              id="type"
              className={`input ${errors.type ? "border-red-500" : ""}`}
              {...register("type", {
                required: "El tipo de perfil es requerido",
              })}
            >
              <option value="standard">Adulto</option>
              <option value="kid">Niño</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </fieldset>
        )}

        <button type="submit" className="button" disabled={isLoading}>
          {isEditing ? "Guardando..." : "Editar"}
        </button>

        {profile.role.name !== "owner" && (
          <button
            type="button"
            className="button bg-red-400 hover:bg-red-500"
            onClick={handleClickDelete}
            disabled={isLoading}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        )}
      </form>
    </>
  );
};
