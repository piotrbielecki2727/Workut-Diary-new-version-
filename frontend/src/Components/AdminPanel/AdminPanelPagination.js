import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import PrintUsersTable from './Users/PrintUsersTable';
import PrintExercisesTable from './Exercises/PrintExercisesTable';




function AdminPanelPagination({ data, userUpdated, setUserUpdated, CurrentPagination, setExercisesListUpdate, exercisesListUpdate  }) {


    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    var itemsPerPage = 12;


    useEffect(() => {
        console.log(data);
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };




    return (
        <>
            {CurrentPagination === "Users" ?
                (
                    <PrintUsersTable currentItems={currentItems} userUpdated={userUpdated} setUserUpdated={setUserUpdated} />
                ) : CurrentPagination === "Exercises" ? (
                    <PrintExercisesTable currentItems={currentItems} exercisesListUpdate={exercisesListUpdate} setExercisesListUpdate={setExercisesListUpdate} />

                ) :
                    (
                        <></>
                    )
            }
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                containerClassName='pagination'
                pageLinkClassName='pageNumber'
                previousLinkClassName='pageNumber'
                nextLinkClassName='pageNumber'
                activeLinkClassName='active'
            />
        </>
    );
}

export default AdminPanelPagination;




