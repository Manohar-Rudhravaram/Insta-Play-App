import { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { listContext } from '../context/ListContext';
import { searchContext } from '../context/SearchContext';

export default function Pagination() {
    const { setPageCount, data } = useContext(listContext); //context data
    const { totalPages, search } = useContext(searchContext); //context data

    //to set the page and call api 
    const handlePageClick = ({ selected }) => {
        let pageSelected = selected + 1;
        setPageCount(pageSelected);
    };

    return (
        <>
            <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                pageCount={!search.keyword ? data.total_pages / 2 : totalPages}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </>
    )
}