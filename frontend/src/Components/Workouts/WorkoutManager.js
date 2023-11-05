import React, { useState, useEffect } from "react";
import './WorkoutManager.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CreateWorkout from "./CreateWorkout";
import DeleteWorkout from "./DeleteWorkout";
import { useUserId } from '../UserIdContext';

import {
    Link,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCalendarWeek, faCheck } from "@fortawesome/free-solid-svg-icons";
import EditWorkout from "./EditWorkout";



function WorkoutManager() {

    const { userId } = useUserId();
    const [workouts, setWorkouts] = useState([]);
    const [newWorkoutAdded, setNewWorkoutAdded] = useState(false);
    const [workoutDeleted, setWorkoutDeleted] = useState(false);
    const [workoutEdited, setWorkoutEdited] = useState(false);
    const [workoutId, setWorkoutId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    const handleClick = (workoutId) => {
        setIsEditing(true);
        setWorkoutId(workoutId);
    }



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
                            <Table id="workoutManagerTable" bordered responsive >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Last performed</th>
                                        <th>Check</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workouts.map(workout => (
                                        <tr key={workout.id_workout}>
                                            <td id="tdButtons">
                                                <Button id="ButtonWorkoutManager" as={Link} to={`/workoutPlanner/${workout.id_workout}`}>
                                                    <FontAwesomeIcon icon={faPlay} style={{ color: "#000000" }} />
                                                </Button>
                                            </td>
                                            <td onClick={() => handleClick(workout.id_workout)}>
                                                {isEditing ? (
                                                    <EditWorkout
                                                        isEditing={isEditing}
                                                        setIsEditing={setIsEditing}
                                                        workoutId={workout.id_workout}
                                                        workoutName={workout.Name}
                                                        workoutDate={new Date(workout.Date).toLocaleString()}
                                                        workoutEdited={workoutEdited}
                                                        setWorkoutEdited={setWorkoutEdited}
                                                    />
                                                ) : (
                                                    workout.Name
                                                )}
                                            </td>

                                            {workout.Date ? (
                                                <><td>{new Date(workout.Date).toLocaleString()} </td>
                                                    <td> <Button id="ButtonWorkoutManager" as={Link} to={`/workoutPlanner/${workout.id_workout}`}>
                                                        <FontAwesomeIcon icon={faCalendarWeek} style={{ color: "#000000" }} />
                                                    </Button></td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>...</td>
                                                    <td>...</td>
                                                </>
                                            )}

                                            <td id="tdButtons">
                                                <DeleteWorkout
                                                    workoutId={workout.id_workout}
                                                    workoutDeleted={workoutDeleted}
                                                    setWorkoutDeleted={setWorkoutDeleted}
                                                />
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
