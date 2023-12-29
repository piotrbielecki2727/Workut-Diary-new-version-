import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import AdminPanelPagination from './AdminPanelPagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function AdminPanelSearchBar({ data, CurrentPagination, userUpdated, setUserUpdated, setExercisesListUpdate, exercisesListUpdate }) {

    const [searchValue, setSearchValue] = useState();
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        setFilteredList(data);
    }, [data]);


    const clearSearchBar = () => {
        setSearchValue('');
        setFilteredList(data);
    }

    const filterBySearch = (e) => {
        const updatedSearchValue = e.target.value;
        var updatedList = [...data];
        const filteredList = updatedList.filter((item) => {
            if (CurrentPagination === "Users")
                return item.first_name.toLowerCase().indexOf(updatedSearchValue.toLowerCase()) !== -1
            else if (CurrentPagination === "Exercises")
                return item.Name.toLowerCase().indexOf(updatedSearchValue.toLowerCase()) !== -1
        });
        setSearchValue(updatedSearchValue);

        setFilteredList(filteredList);
    }



    return (
        <>
            {data.length > 0 ? (
                <>
                    <div id='FilterWorkoutSearchdiv'>
                        <div id='FilterWorkoutSearch'>
                            <Form.Control
                                id='FilterWorkoutFormControl'
                                type="text"
                                value={searchValue}
                                placeholder="Type to search..."
                                onChange={filterBySearch}
                            />
                            <i onClick={clearSearchBar} id="FilterWorkoutX"><FontAwesomeIcon icon={faX} /></i>
                        </div>
                    </div>
                    <AdminPanelPagination data={filteredList} userUpdated={userUpdated} setUserUpdated={setUserUpdated} CurrentPagination={CurrentPagination} setExercisesListUpdate={setExercisesListUpdate} exercisesListUpdate={exercisesListUpdate} />
                </>
            ) : (
                <>
                    <h5>There is nothing to print.</h5>
                </>
            )}
        </>
    );
}

export default AdminPanelSearchBar;




