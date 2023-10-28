import React from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddExercise({workoutId, ChoosedExerciseId, newExerciseAdded, setNewExerciseAdded}) {


    const addExerciseToChosenWorkout = () => {
        console.log(workoutId)
        console.log(ChoosedExerciseId)
        axios.post(`http://localhost:3001/addExerciseToChosenWorkout`, {workoutId, ChoosedExerciseId})

            .then(res => {
                if (res.data.Success) {
                    console.log("udalo sie :D");
                    setNewExerciseAdded(true);

                }
                else {
                    console.error("Error addExerciseToChosenWorkout", res.data.Error);

                }
            })
            .catch(err => {
                console.log(err);
            })

    }






    return (
        <>
            <Button id='modalButton' onClick={addExerciseToChosenWorkout}><FontAwesomeIcon icon={faPlus} /> Add</Button>
        </>
    );
}

export default AddExercise;




