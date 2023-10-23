import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import WorkoutManager from "./WorkoutManager";




function DeleteWorkout({ workoutId, workoutDeleted, setWorkoutDeleted }) {

    const deleteWorkout = () => {
        console.log(workoutId)
        axios.delete(`http://localhost:3001/deleteWorkout`, { data: { workoutId } })
            .then(res => {
                if (res.data.Success) {
                    console.log("gicik");
                    setWorkoutDeleted(true);
                }
                else {
                    console.log("err");
                }
            })
            .catch(err => {
                console.log(err)
            })
            setWorkoutDeleted(false);

    }



    return (
        <>
            <Button id="buttonWorkoutManager" onClick={deleteWorkout}><FontAwesomeIcon icon={faXmark} /></Button>
        </>
    );

}
export default DeleteWorkout;
