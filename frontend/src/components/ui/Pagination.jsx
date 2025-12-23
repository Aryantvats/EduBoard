const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white disabled:opacity-40 hover:bg-white/10"
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 rounded-lg text-sm border
              ${
                currentPage === page
                  ? "bg-indigo-500 border-indigo-500 text-white"
                  : "border-white/20 text-gray-300 hover:bg-white/10"
              }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg border border-white/20 text-sm text-white disabled:opacity-40 hover:bg-white/10"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
