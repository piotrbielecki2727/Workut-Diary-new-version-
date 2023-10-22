import React, { useState, useEffect } from "react";
import './WorkoutManager.css';
import axios from 'axios';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import CreateWorkout from "./CreateWorkout";



function WorkoutManager() {

    const userId = sessionStorage.getItem('userId');
    const [workouts, setWorkouts] = useState([]);
    const [newWorkoutAdded, setNewWorkoutAdded] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/getWorkouts/${userId}`)
            .then(res => {
                if (res.data.Success) {
                    console.log(res.data.result)
                    setWorkouts(res.data.result)
                }
                else {
                    console.log("err")
                }

            })
            .catch(err => {
                console.log("err")

            })
            setNewWorkoutAdded(false);

    },[newWorkoutAdded]);


    return (
        <Container id="workoutManagerContainer">
            <h3>Workout manager</h3>
            <CreateWorkout newWorkoutAdded={newWorkoutAdded} setNewWorkoutAdded={setNewWorkoutAdded} />
            <Container id="workoutManagerContainer2">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map(workout => (
                            <tr key={workout.id_workout}>
                                <td>{workout.Name}</td>
                                <td>{workout.Date}</td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

            </Container>
        </Container>
    );
}

export default WorkoutManager;
