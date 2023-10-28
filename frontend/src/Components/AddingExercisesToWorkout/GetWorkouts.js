import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useUserId } from '../UserIdContext';
import './GetWorkouts.css';
import { Link } from "react-router-dom";


function GetWorkouts({ workoutId, setWorkoutId, selectedWorkout, setSelectedWorkout, exercises, setExercises, workouts, setWorkouts }) {

    const { userId } = useUserId();

    const handleSelectedOption = (event) => {
        const selectedWorkoutName = event.target.value;
        const selectedWorkout = workouts.find(workout => workout.Name === selectedWorkoutName);
        setSelectedWorkout(selectedWorkout);
        setWorkoutId(selectedWorkout.id_workout);
        setExercises([]);
    }


    useEffect(() => {
        axios.get(`http://localhost:3001/getWorkouts/${userId}`)
            .then(res => {
                if (res.data.Success) {
                    setWorkouts(res.data.result);
                }
                else {
                    console.error("Error getWorkoutExercises", res.data.Error);
                }

            })
            .catch(err => {
                console.log("err")

            })
    }, [userId])



    return (
        <>
            {workouts.length > 0 ? (
                <>
                    <h5>Choose the workout you want to add this exercise to:</h5>
                    <Form.Select onChange={handleSelectedOption} value={selectedWorkout ? selectedWorkout.Name : ''}>
                        <option value="" disabled>Select Workout</option>
                        {workouts.map(workout => (
                            <option key={workout.id_workout} value={workout.Name}>{workout.Name}</option>
                        ))}
                    </Form.Select>
                </>
            ) : (
                <>
                    <h5 id='h5red'>If you don't have any workouts, you need to create one first in the <Link to={`/workoutManager/`} id='linkToWorkoutManager'>Workout Manager</Link> </h5>
                </>
            )
            }

        </>
    );
}

export default GetWorkouts;



