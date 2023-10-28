import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useUserId } from '../UserIdContext';


function GetWorkouts({workoutId, setWorkoutId, selectedWorkout, setSelectedWorkout, exercises, setExercises}) {

    const [workouts, setWorkouts] = useState([]);
    const { userId } = useUserId();

    const handleSelectedOption = (event) => {
        const selectedWorkoutName = event.target.value;
        const selectedWorkout = workouts.find(workout => workout.Name === selectedWorkoutName);
        setSelectedWorkout(selectedWorkout);
        setWorkoutId(selectedWorkout.id_workout);
        setExercises([]);
    }


    useEffect(() => {
        console.log("dla usera: " + userId);
        axios.get(`http://localhost:3001/getWorkouts/${userId}`)
            .then(res => {
                if (res.data.Success) {
                    console.log(res.data.result);
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
            <h5>Choose the workout you want to add this exercise to:</h5>
            <Form.Select onChange={handleSelectedOption} value={selectedWorkout ? selectedWorkout.Name : ''}>
                <option value="" disabled>Select Workout</option>
                {workouts.map(workout => (
                    <option key={workout.id_workout} value={workout.Name}>{workout.Name}</option>
                ))}
            </Form.Select>
        </>
    );
}

export default GetWorkouts;



