// src/components/SelectProfilePage.jsx

import { useAuth } from "@/features/auth/context/AuthContext";
// Importa iconos que podrías usar como avatares placeholder
import {
  FaUserCircle,
  FaSmile,
  FaChild,
  FaUserAstronaut,
} from "react-icons/fa";
import { ProfileCard } from "../components/ProfileCard";
import { Header } from "@/layouts/Header";

// Datos de los perfiles (puedes mover esto a un archivo JSON o obtenerlo de una API)
// const initialProfiles = [
//   {
//     id: 1,
//     name: "Adulto 1",
//     avatar: <FaUserCircle className="w-full h-full" />,
//     bgColor: "bg-blue-500", // Color de fondo para el avatar si no hay imagen
//     borderColor: "hover:border-blue-400",
//   },
//   {
//     id: 2,
//     name: "Adulto 2",
//     avatar: <FaSmile className="w-full h-full" />,
//     bgColor: "bg-green-500",
//     borderColor: "hover:border-green-400",
//   },
//   {
//     id: 3,
//     name: "Niño",
//     avatar: <FaChild className="w-full h-full" />,
//     bgColor: "bg-yellow-500",
//     borderColor: "hover:border-yellow-400",
//   },
//   {
//     id: 4,
//     name: "Invitado",
//     avatar: <FaUserAstronaut className="w-full h-full" />,
//     bgColor: "bg-purple-500",
//     borderColor: "hover:border-purple-400",
//   },
//   // Puedes agregar un perfil "Añadir Perfil" si lo deseas
//   // {
//   //   id: 'add',
//   //   name: 'Añadir Perfil',
//   //   avatar: <FaPlusCircle className="w-1/2 h-1/2 text-gray-400" />,
//   //   isAddButton: true,
//   //   borderColor: 'hover:border-gray-500',
//   // }
// ];

function SelectProfilePage() {
  const { selectedProfile, selectProfile, profiles } = useAuth();

  const handleProfileSelect = (profile) => {
    // if (profile.isAddButton) {
    //   console.log('Añadir nuevo perfil');
    //   // Lógica para añadir perfil
    //   return;
    // }
    selectProfile(profile.id);
  };

  const handleManageProfiles = () => {
    console.log("Administrar Perfiles");
    // Lógica para navegar a la página de administración de perfiles
    // Ejemplo: navigate('/manage-profiles');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg-primary dark:bg-dark-bg-primary text-white flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 sm:mb-16">
            ¿Quién está viendo?
          </h1>
          <div className="flex justify-center gap-4 mb-8 sm:gap-6 md:gap-8">
            {profiles?.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onClick={handleProfileSelect}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleManageProfiles}
            className="
              px-6 py-2 sm:px-8 sm:py-3
              border border-gray-500 text-gray-400
              rounded-md text-sm sm:text-base
              hover:border-white hover:text-white
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-gray-400
            "
          >
            Administrar Perfiles
          </button>
        </div>
        {selectedProfile && (
          <div className="mt-8 p-4 bg-gray-800 rounded-md text-center">
            <p>Perfil activo: {selectedProfile.name}</p>
          </div>
        )}
      </main>
    </>
  );
}

export default SelectProfilePage;
