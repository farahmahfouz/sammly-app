function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            {/* Previous */}
            <button
                type="button"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
                ‹
            </button>

            {pages.map((page) => (
                <button
                    type="button"
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-lg border flex items-center justify-center text-sm ${
                        currentPage === page
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-primary border-slate-200 hover:bg-slate-50"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
                ›
            </button>
        </div>
    );
}

export default Pagination;