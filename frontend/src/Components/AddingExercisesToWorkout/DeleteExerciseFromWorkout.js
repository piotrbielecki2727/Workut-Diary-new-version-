import React from 'react'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';





function DeleteExerciseFromWorkout({ workoutId, exerciseId, setExerciseDeleted }) {



    const deleteExerciseFromWorkout = () => {
        axios.delete(`http://localhost:3001/deleteExerciseFromWorkout/${workoutId}/${exerciseId}`)
            .then(res => {
                if (res.data.Success === "Success") {
                    console.log("udalo sie usunac");
                    setExerciseDeleted(true);

                }
                else {
                    console.log("err");
                }
            })
            .catch(err => {
                console.log(err)
            })

    }


    return (
        <>
            <Button onClick={deleteExerciseFromWorkout}><FontAwesomeIcon icon={faXmark} /></Button>
        </>
    );
}

export default DeleteExerciseFromWorkout;




