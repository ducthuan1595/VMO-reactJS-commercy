import ReactPaginate from "react-paginate";

const Navigation = ({totalPage, setPage}) => {

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        nextClassName="cursor-pointer hover:bg-[#20B2AA] hover:text-[#fff] py-1 px-3 rounded"
        previousClassName="cursor-pointer hover:bg-[#20B2AA] hover:text-[#fff] py-1 px-3 rounded"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={totalPage}
        previousLabel="<"
        renderOnZeroPageCount={null}
        activeClassName="bg-[#20B2AA] text-white"
        className="flex items-center justify-center py-5 gap-4"
        pageClassName="py-1 px-3 rounded hover:bg-[#20B2AA] hover:text-[#fff]"
      />
    </>
  );
};

export default Navigation;
