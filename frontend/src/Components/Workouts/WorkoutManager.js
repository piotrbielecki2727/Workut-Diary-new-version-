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
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);


    const handleClick = (workoutId) => {
        setSelectedWorkoutId(workoutId);
        setIsEditing(true);
    }

    const handleShowCreate = () => {
        setIsCreating(true);
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
                <h3>Manage your workouts</h3>
                <Button variant="primary" onClick={handleShowCreate} id='createNewWorkoutButton'>Create new workout</Button>
                {isCreating ?
                    (<CreateWorkout newWorkoutAdded={newWorkoutAdded} setNewWorkoutAdded={setNewWorkoutAdded} setIsCreating={setIsCreating} />
                    ) : (<></>)
                }
                <Container id="workoutManagerContainer2">
                    {workouts.length > 0 ? (
                        <>
                            <Table id="workoutManagerTable" bordered responsive >
                                <thead>
                                    <tr>
                                        <th>Start workout</th>
                                        <th>Name</th>
                                        <th>Last performed</th>
                                        <th>Check</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {workouts.map(workout => (
                                        <tr key={workout.id_group}>
                                            <td id="tdButtons">
                                                <Button id="ButtonWorkoutManager" as={Link} to={`/workoutPlanner/${workout.id_group}`}>
                                                    <FontAwesomeIcon icon={faPlay} style={{ color: "#000000" }} />
                                                </Button>
                                            </td>
                                            <td onClick={() => handleClick(workout.id_group)}>
                                                {isEditing && selectedWorkoutId === workout.id_group ? (
                                                    <EditWorkout isEditing={isEditing}  setIsEditing={setIsEditing}  
                                                    workoutId={workout.id_group} workoutName={workout.Name} workoutEdited={workoutEdited} 
                                                    setWorkoutEdited={setWorkoutEdited}
                                                    />
                                                ) : (
                                                    workout.name
                                                )}
                                            </td>

                                            {workout.latest_date ? (
                                                <><td>{new Date(workout.latest_date).toLocaleString()} </td>
                                                    <td> <Button id="ButtonWorkoutManager" as={Link} 
                                                    to={`/lastWorkout/${workout.latest_done_training_id}/${workout.name}/${workout.latest_date}`}>
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
                                                <DeleteWorkout workoutId={workout.id_group}  workoutDeleted={workoutDeleted} setWorkoutDeleted={setWorkoutDeleted}
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
