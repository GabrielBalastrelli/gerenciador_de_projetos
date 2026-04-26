interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  onChange: (pagina: number) => void;
}

export const Pagination = ({
  paginaAtual,
  totalPaginas,
  onChange,
}: PaginationProps) => {
  if (totalPaginas <= 1) return null;

  const paginas = [];

  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
      <button
        className="btn btn-outline-primary"
        disabled={paginaAtual === 1}
        onClick={() => onChange(paginaAtual - 1)}
      >
        Anterior
      </button>

      {paginas.map((pagina) => (
        <button
          key={pagina}
          className={`btn ${
            pagina === paginaAtual ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => onChange(pagina)}
        >
          {pagina}
        </button>
      ))}

      <button
        className="btn btn-outline-primary"
        disabled={paginaAtual === totalPaginas}
        onClick={() => onChange(paginaAtual + 1)}
      >
        Próxima
      </button>
    </div>
  );
};
