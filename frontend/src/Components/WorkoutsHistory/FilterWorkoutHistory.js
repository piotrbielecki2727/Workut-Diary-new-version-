import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserId } from '../UserIdContext';
import Form from 'react-bootstrap/Form';
import './FilterWorkoutHistory.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../Exercises/Pagination';

function FilterWorkoutHistory() {


    const { userId } = useUserId();
    const [workouts, setWorkouts] = useState([]);
    const [searchValue, setSearchValue] = useState();
    const [filteredList, setFilteredList] = useState([]);
    const WorkoutHistory = "WorkoutHistory";


    const clearSearchBar = () => {
        setSearchValue('');
        setFilteredList(workouts);
    }


    useEffect(() => {
        axios.get(`http://localhost:3001/getUserDoneWorkouts/${userId}`)
            .then(res => {
                if (res.data.Success) {
                    console.log(res.data.result)
                    setWorkouts(res.data.result)
                    setFilteredList(res.data.result);
                }
                else
                    console.log("error")
            })
            .catch(err => {
                console.log(err)
            })
    }, [userId]);


    const filterBySearch = (e) => {
        const updatedSearchValue = e.target.value;


        var updatedList = [...workouts];

        const filteredList = updatedList.filter((workout) =>
            workout.training_group_name.toLowerCase().indexOf(updatedSearchValue.toLowerCase()) !== -1
        );
        setSearchValue(updatedSearchValue);

        setFilteredList(filteredList);
    }


    return (
        <>
            <h3 id='WorkoutHistoryh2'>Workouts history</h3>
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
            <Pagination data={filteredList} CurrentPagination={WorkoutHistory} />
        </>
    );
}

export default FilterWorkoutHistory;




