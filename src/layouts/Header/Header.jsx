import { useState } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { FiChevronDown } from "react-icons/fi";
import { FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { RiMovie2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ThemeButton } from "./ThemeButton";

/**
 *
 * @param {{isFixed?: boolean}} props
 * @returns
 */
const Header = ({ isFixed = false }) => {
  const { user, profiles, selectedProfile, selectProfile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <header
      className={`bg-bg-secondary dark:bg-dark-bg-secondary shadow-md top-0 left-0 w-full z-50 ${
        isFixed ? "fixed" : "sticky"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo y Navegación */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center cursor-pointer select-none"
            >
              <RiMovie2Line className="text-red-500 text-3xl mr-2" />
              <span className="text-xl font-bold">
                NODO Movies{" "}
                {selectedProfile?.role.name === "kid" && (
                  <span className="text-red-500">KIDS</span>
                )}
              </span>
            </Link>
            {user && (
              <nav className="flex space-x-6">
                <Link to="/movies" className="hover:text-red-400 transition">
                  Inicio
                </Link>
                <Link
                  to="/movies/search"
                  className="hover:text-red-400 transition"
                >
                  Busqueda
                </Link>
                <Link to="/watchlist" className="hover:text-red-400 transition">
                  Mi lista
                </Link>
              </nav>
            )}
          </div>
          {/* Perfil */}
          <div className="flex items-center gap-1">
            <ThemeButton className="ml-auto" />
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Selector de Perfiles */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center space-x-2 hover:text-red-400 transition"
                  >
                    {selectedProfile?.avatar ? (
                      <img
                        src={selectedProfile.avatar}
                        alt={selectedProfile.name}
                        className="w-8 h-8 rounded-md"
                      />
                    ) : (
                      <FaUserCircle className="text-2xl" />
                    )}
                    <span>{selectedProfile?.name}</span>
                    <FiChevronDown
                      className={`transition-transform ${
                        profileMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 bg-bg-primary dark:bg-dark-bg-primary">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm text-gray-400">
                          Seleccionar perfil
                        </p>
                      </div>
                      {profiles?.map((profile) => (
                        <button
                          type="button"
                          key={profile.id}
                          onClick={() => {
                            selectProfile(profile.id);
                            setProfileMenuOpen(false);
                          }}
                          className={`w-full cursor-pointer text-left px-4 py-2 hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary flex items-center space-x-2 ${
                            selectedProfile?.id === profile.id
                              ? "text-red-400"
                              : ""
                          }`}
                        >
                          {profile.avatar ? (
                            <img
                              src={profile.avatar}
                              alt={profile.name}
                              className="w-6 h-6 rounded-md"
                            />
                          ) : (
                            <FaRegUserCircle className="text-xl" />
                          )}
                          <span>{profile.name}</span>
                        </button>
                      ))}
                      <div className="border-t border-gray-700 mt-1">
                        <Link
                          to="/profiles"
                          className="block px-4 py-2 text-sm hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary"
                        >
                          Seleccionar perfil
                        </Link>
                        {selectedProfile?.role.name == "owner" && (
                          <Link
                            to="/profiles/manage"
                            className="block px-4 py-2 text-sm hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary"
                          >
                            Administrar perfiles
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-gray-700 mt-1">
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary"
                          onClick={() => {
                            logout();
                          }}
                        >
                          Cerrar sesión
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="px-4 py-1 rounded-md transition"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-1 rounded-md transition"
                >
                  Registrarme
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between">
          <Link to={"/movies"} className="flex items-center">
            <RiMovie2Line className="text-red-500 text-2xl mr-2" />
            <span className="text-lg font-bold">
              NODO Movies{" "}
              {selectedProfile?.role.name === "kid" && (
                <span className="text-red-500">KIDS</span>
              )}
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeButton />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <HiOutlineX className="text-2xl" />
              ) : (
                <HiOutlineMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-bg-secondary dark:bg-dark-bg-secondary mt-3 rounded-md p-4">
            {user ? (
              <nav className="flex flex-col space-y-3">
                <Link to="/movies" className="hover:text-red-400 transition">
                  Inicio
                </Link>
                <Link to="/watchlist" className="hover:text-red-400 transition">
                  Mi lista
                </Link>
              </nav>
            ) : (
              <nav className="flex flex-col space-y-3">
                <Link
                  to="/auth/login"
                  className="px-4 py-1 rounded-md transition"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-1 rounded-md transition"
                >
                  Registrarme
                </Link>
              </nav>
            )}

            {user && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-400 mb-2">Perfil actual:</p>
                <div className="flex items-center space-x-2">
                  {selectedProfile?.avatar ? (
                    <img
                      src={selectedProfile.avatar}
                      alt={selectedProfile.name}
                      className="w-8 h-8 rounded-md"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl" />
                  )}
                  <span>{selectedProfile?.name}</span>
                </div>

                {/* Lista de perfiles */}
                <div className="mt-3 space-y-2">
                  {profiles?.map((profile) => (
                    <button
                      type="button"
                      key={profile.id}
                      onClick={() => {
                        selectProfile(profile.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-bg-primary flex items-center space-x-2 ${
                        selectedProfile?.id === profile.id ? "text-red-400" : ""
                      }`}
                    >
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-6 h-6 rounded-md"
                        />
                      ) : (
                        <FaRegUserCircle className="text-xl" />
                      )}
                      <span>{profile.name}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-700 mt-4 py-4 space-y-3">
                  <Link
                    to="/profiles"
                    className="block hover:text-red-400 transition"
                  >
                    Seleccionar perfil
                  </Link>
                  {selectedProfile?.role.name == "owner" && (
                    <Link
                      to="/profiles/manage"
                      className="block hover:text-red-400 transition "
                    >
                      Administrar perfiles
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
