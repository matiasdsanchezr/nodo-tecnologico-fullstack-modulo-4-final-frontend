import { useAuth } from "@/features/auth/context/AuthContext";
import { ProfileCard } from "../components/ProfileCard";
import { Header } from "@/layouts/Header";
import { FaSmile, FaUserCircle } from "react-icons/fa";

export const SelectProfilePage = () => {
  const { selectedProfile, selectProfile, profiles } = useAuth();

  const handleProfileSelect = (profile) => {
    selectProfile(profile.id);
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
                avatar={
                  profile.role.name != "kid" ? (
                    <FaUserCircle className="w-full h-full" />
                  ) : (
                    <FaSmile className="w-full h-full" />
                  )
                }
                bgColor="bg-bg-secondary"
                onClick={handleProfileSelect}
              />
            ))}
          </div>
        </div>
        {selectedProfile && (
          <div className="mt-8 p-4 bg-gray-800 rounded-md text-center">
            <p>Perfil activo: {selectedProfile.name}</p>
          </div>
        )}
      </main>
    </>
  );
};

