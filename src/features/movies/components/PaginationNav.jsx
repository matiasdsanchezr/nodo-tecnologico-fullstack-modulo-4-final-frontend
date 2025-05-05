import React, { useState } from "react";

/**
 *
 * @param {{totalPages: number, currentPage?: number, onPageChange: (page: number)=> void}} param0
 * @returns
 */
export const PaginationNav = ({
  totalPages,
  currentPage = 1,
  onPageChange,
}) => {
  const [pageInput, setPageInput] = useState("");

  const handleGoToPage = (
    /** @type {React.FormEvent<HTMLFormElement>} */ e
  ) => {
    e.preventDefault();
    const parsedPageNumber = parseInt(pageInput);
    if (isNaN(parsedPageNumber)) {
      return;
    }
    onPageChange(parsedPageNumber);
  };

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          type="button"
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
          disabled={currentPage <= 1}
          className=""
        >
          Anterior
        </button>
        <span className="">
          Página {currentPage} de {Math.min(totalPages, 500)}
        </span>
        <button
          type="button"
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
          disabled={currentPage >= totalPages}
          className=""
        >
          Siguiente
        </button>
      </div>
      <form className="flex items-center space-x-2" onSubmit={handleGoToPage}>
        <label htmlFor="goToPageInput" className="sr-only">
          Ir a la página:
        </label>
        <input
          id="goToPageInput"
          type="number"
          min="1"
          max={Math.min(totalPages, 500)} /* Usa encadenamiento opcional */
          value={pageInput}
          onChange={(e) => {
            setPageInput(e.currentTarget.value);
          }}
          placeholder="Ir a pág."
          className="w-24 px-2 py-1 border rounded text-center" /* Ajusta el ancho si es necesario */
        />
        <button
          type="submit"
          className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed" /* Añadido estilo básico */
        >
          Ir a la pagina
        </button>
      </form>
    </div>
  );
};
