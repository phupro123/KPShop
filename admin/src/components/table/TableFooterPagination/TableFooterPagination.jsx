import { BiChevronRight } from "react-icons/bi";

const TableFooterPagination = ({
  pageIndex = 0,
  totalPages = 1,
  onChangePageIndex,
}) => {
  const handleChangePage = (page) => {
    onChangePageIndex(page);
  };

  const handleClickPrevButton = () => {
    handleChangePage(pageIndex - 1);
  };

  const handleClickNextButton = () => {
    handleChangePage(pageIndex + 1);
  };

  return (
    <nav className="relative z-0 mx-auto inline-flex rounded-md shadow-sm">
      <button
        className="relative inline-flex items-center rounded-l-md border border-gray-100 bg-white px-2 py-2 text-sm font-medium text-gray-500 disabled:opacity-50 hover:bg-gray-50"
        disabled={pageIndex === 0}
        type="button"
        onClick={handleClickPrevButton}
      >
        <span className="sr-only">Previous</span>
        <BiChevronRight size={20} className="rotate-180" />
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <div
          className={`relative inline-flex cursor-pointer items-center border px-4 py-2 text-sm font-medium ${
            index === pageIndex
              ? "relative z-10 border-primary-700 bg-primary-50 text-primary-700"
              : "border-gray-100 bg-white text-gray-500 hover:bg-gray-50"
          }`}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          role="button"
          tabIndex={0}
          onClick={() => handleChangePage(index)}
        >
          {index + 1}
        </div>
      ))}
      <button
        className="relative inline-flex cursor-pointer items-center rounded-r-md border border-gray-100 bg-white px-2 py-2 text-sm font-medium text-gray-500 disabled:cursor-default disabled:opacity-50 hover:bg-gray-50"
        disabled={pageIndex === totalPages - 1}
        type="button"
        onClick={handleClickNextButton}
      >
        <span className="sr-only">Next</span>
        <BiChevronRight size={20} />
      </button>
    </nav>
  );
};

export default TableFooterPagination;
