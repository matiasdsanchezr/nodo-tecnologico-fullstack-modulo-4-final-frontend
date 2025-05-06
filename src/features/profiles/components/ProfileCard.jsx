import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { TbMoodKid } from "react-icons/tb";

/**
 * @typedef {Object} ProfileCardProps
 * @property {import("../profiles.types").Profile} profile
 * @property {(profile: import("../profiles.types").Profile) => void} onClick
 * @property {React.JSX.Element} avatar
 * @property {string} bgColor
 * @property {string} [className]
 */

/**
 * Card para mostrar un perfil
 * @param {ProfileCardProps} props
 * @returns
 */
export const ProfileCard = ({
  profile,
  avatar,
  bgColor,
  onClick,
  className,
}) => {
  return (
    <div
      key={profile.id}
      className="group cursor-pointer flex flex-col items-center"
      onClick={() => onClick(profile)}
      role="button"
      tabIndex={0}
      aria-label={`Seleccionar perfil ${profile.name}`}
    >
      <div
        className={`${bgColor} w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-md overflow-hidden border-4 border-transparent hover:border-blue-400 transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-lg flex items-center justify-center p-2 ${className}`}
      >
        {avatar}
      </div>
      <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-400 group-hover:text-white transition-colors duration-200">
        {profile.name}
      </p>
      {profile.role.name === "owner" && <p>Dueño</p>}
    </div>
  );
};
