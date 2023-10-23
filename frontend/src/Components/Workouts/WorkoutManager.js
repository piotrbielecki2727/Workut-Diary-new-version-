import React, { useState, useEffect } from "react";
import './WorkoutManager.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CreateWorkout from "./CreateWorkout";
import DeleteWorkout from "./DeleteWorkout";
import EditWorkout from "./EditWorkout";
import {
    Link,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";



function WorkoutManager() {

    const userId = sessionStorage.getItem('userId');
    const [workouts, setWorkouts] = useState([]);
    const [newWorkoutAdded, setNewWorkoutAdded] = useState(false);
    const [workoutDeleted, setWorkoutDeleted] = useState(false);
    const [workoutEdited, setWorkoutEdited] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:3001/getWorkouts/${userId}`)
            .then(res => {
                if (res.data.Success) {
                    console.log(res.data.result);
                    setWorkouts(res.data.result);
                }
                else {
                    console.log("err")
                }

            })
            .catch(err => {
                console.log("err")

            })
        setNewWorkoutAdded(false);

    }, [newWorkoutAdded, workoutDeleted, workoutEdited]);


    return (
        <Container id="workoutManagerContainer">
            <h3>Workout manager</h3>
            <CreateWorkout newWorkoutAdded={newWorkoutAdded} setNewWorkoutAdded={setNewWorkoutAdded} />
            <Container id="workoutManagerContainer2">
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Last performed</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map(workout => (
                            <tr key={workout.id_workout}>
                                <td><Button id="buttonWorkoutManager" as={Link} to="/workoutPlanner"><FontAwesomeIcon icon={faPlay} /></Button></td>
                                <td>{workout.Name}</td>
                                <td>{new Date(workout.Date).toLocaleString()}</td>
                                <td id="tdButtons">
                                    <EditWorkout workoutId={workout.id_workout} workoutName={workout.Name} workoutDate={new Date(workout.Date).toLocaleString()} workoutEdited={workoutEdited} setWorkoutEdited={setWorkoutEdited} />
                                    <DeleteWorkout workoutId={workout.id_workout} workoutDeleted={workoutDeleted} setWorkoutDeleted={setWorkoutDeleted} />
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </Table>

            </Container>
        </Container>
    );
}

export default WorkoutManager;
