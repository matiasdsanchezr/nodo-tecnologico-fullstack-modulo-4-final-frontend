import { useAuth } from "@/features/auth/context/AuthContext";
import { ProfileCard } from "../components/ProfileCard";
import { Header } from "@/layouts/Header";
import { FaPlusCircle, FaSmile, FaUserCircle } from "react-icons/fa";
import { ProfileEditForm } from "../components/ProfileEditForm";
import { useState } from "react";
import { CreateProfileForm } from "../components/CreateProfileForm";

export const ProfilesManagePage = () => {
  const { profiles } = useAuth();
  const [clickedProfile, setClickedProfile] = useState(profiles?.[0]);

  // @ts-ignore
  const handleProfileClick = (profile) => {
    setClickedProfile(profile);
  };

  const handleAddProfileClick = () => {
    setClickedProfile(undefined);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg-primary dark:bg-dark-bg-primary text-white flex flex-col items-center justify-center">
        <section className="text-center p-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 sm:mb-16">
            Administrar perfiles
          </h1>
          <div className="gap-4 mb-8 sm:gap-6 md:gap-8 grid grid-cols-2 md:grid-cols-4 ">
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
                bgColor="bg-bg-secondary dark:bg-dark-bg-secondary"
                onClick={() => handleProfileClick(profile)}
                className={`${
                  clickedProfile?.id == profile.id
                    ? "!border-blue-400"
                    : "border-transparent"
                }`}
              />
            ))}
            {profiles && profiles.length < 4 && (
              <ProfileCard
                key="add"
                profile={{
                  id: "add",
                  name: "Agregar perfil",
                  user: "",
                  role: "",
                }}
                avatar={<FaPlusCircle className="w-1/2 h-1/2" />}
                bgColor="bg-bg-secondary dark:bg-dark-bg-secondary"
                onClick={handleAddProfileClick}
              />
            )}
          </div>
        </section>
        {clickedProfile ? (
          <div>
            <ProfileEditForm profile={clickedProfile} />
          </div>
        ) : (
          <div>
            <CreateProfileForm />
          </div>
        )}
      </main>
    </>
  );
};
