import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AddExercise({ workoutId, ChoosedExerciseId, newExerciseAdded, setNewExerciseAdded }) {

    const [order, setOrder] = useState(1);


    useEffect(() => {
        axios.get(`http://localhost:3001/getHighestOrderValue?workoutId=${workoutId}`)
            .then(res => {
                if (res.data.Success) {
                    setOrder(res.data.max_order + 1);
                }
                if (res.data.Error) {
                    console.log("blad")
                }
            })
            .catch(error => {
                console.log(error);
            })

    }, [workoutId])


    const addExerciseToChosenWorkout = () => {
        axios.post(`http://localhost:3001/addExerciseToChosenWorkout`,
            {
                workoutId,
                ChoosedExerciseId,
                order
            })

            .then(res => {
                if (res.data.Success) {
                    setNewExerciseAdded(true);
                    setOrder(order + 1);
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
            <Button id='AddExerciseToWorkoutmodalButton' onClick={addExerciseToChosenWorkout}><FontAwesomeIcon icon={faPlus} /> Add</Button>
        </>
    );
}

export default AddExercise;




