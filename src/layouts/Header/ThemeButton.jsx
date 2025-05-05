import { useTheme } from "@/contexts/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

/**
 *
 * @param {{className?: string}} props
 * @returns
 */
export const ThemeButton = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme == "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
      }
      className={`p-2 rounded-full focus:outline-none focus:ring focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200 ${className}`}
    >
      {theme == "dark" ? (
        <FiSun className="w-5 h-5" /> // Icono de sol para tema oscuro
      ) : (
        <FiMoon className="w-5 h-5" /> // Icono de luna para tema claro
      )}
    </button>
  );
};
