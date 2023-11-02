import React, { useState, useEffect } from "react";
import './WorkoutManager.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CreateWorkout from "./CreateWorkout";
import DeleteWorkout from "./DeleteWorkout";
import EditWorkout from "./EditWorkout";
import { useUserId } from '../UserIdContext';

import {
    Link,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import WorkoutPlanner from "../WorkoutPlanning/WorkoutPlanner";



function WorkoutManager() {

    const { userId } = useUserId();
    const [workouts, setWorkouts] = useState([]);
    const [newWorkoutAdded, setNewWorkoutAdded] = useState(false);
    const [workoutDeleted, setWorkoutDeleted] = useState(false);
    const [workoutEdited, setWorkoutEdited] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:3001/getWorkouts/${userId}`)
            .then(res => {
                if (res.data.Success) {
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

    }, [newWorkoutAdded, workoutDeleted, workoutEdited, userId]);


    return (
        <div id='background'>
        <Container id="workoutManagerContainer">
            <h3>Workout manager</h3>
            <CreateWorkout newWorkoutAdded={newWorkoutAdded} setNewWorkoutAdded={setNewWorkoutAdded} />
            <Container id="workoutManagerContainer2">
                {workouts.length > 0 ? (
                    <>
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
                                        <td><Button id="buttonWorkoutManager" as={Link} to={`/workoutPlanner/${workout.id_workout}`}><FontAwesomeIcon icon={faPlay} /></Button></td>
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
                    </>
                ) :
                    (<>
                        <h5>Create your first workout!</h5>
                    </>
                    )
                }


            </Container>
        </Container>
        </div>
    );
}

export default WorkoutManager;
