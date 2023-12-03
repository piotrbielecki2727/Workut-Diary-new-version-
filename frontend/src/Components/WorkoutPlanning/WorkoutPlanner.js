import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './WorkoutPlanner.css';
import PrintDnDExercises from '../AddingExercisesToWorkout/PrintDnDExercises'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import StartWorkout from './StartWorkout';

import {
    Link, useParams, useNavigate
} from "react-router-dom";


function WorkoutPlanner() {
    const [newExerciseAdded, setNewExerciseAdded] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [workout, setWorkout] = useState([]);
    const { workoutId } = useParams();
    const WorkoutPlanner = true;
    const [workoutDate, setWorkoutDate] = useState(null);
    const [workoutName, setWorkoutName] = useState(null);





    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/getWorkout/${workoutId}`)
            .then(res => {
                if (res.data.Success) {

                    setWorkout(res.data.result);
                    console.log(workout);
                    setWorkoutName(res.data.result[0].Name);
                    setWorkoutDate(res.data.result[0].Date);


                }
                else {
                    console.error("Error getWorkout", res.data.Error);
                }

            })
            .catch(err => {
                console.log("err")

            })
    }, [workoutId])

    return (
        <div id='background'>
            <Container id='workoutPlannerContainer'>
                <Button id="WorkoutPlannerButton" onClick={handleGoBack}>Back</Button>

                <Container id='plannerBar'>
                    {workout.map(workout => (
                        <div key={workout.id_workout}>
                            <h3 id='nameDatePlannerBar'>{workout.Name}</h3>
                            {workout.Date ? (
                                <h5 id='nameDatePlannerBar'>{new Date(workout.Date).toLocaleString()}</h5>

                            ) : (
                                <>
                                    <p></p>
                                </>
                            )}
                            <Button id="addExerciseButtonWorkoutPlanner" as={Link} to={`/exercises`}>
                                Add exercises <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </div>
                    ))}

                </Container>
                <Container id='printDndPlannerContainer'>
                    <PrintDnDExercises WorkoutPlanner={WorkoutPlanner} exercises={exercises} setExercises={setExercises} workoutId={workoutId} newExerciseAdded={newExerciseAdded} setNewExerciseAdded={setNewExerciseAdded} />
                </Container>
                {exercises.length > 0 ? (
                    <StartWorkout exercises={exercises} workoutId={workoutId} workoutName={workoutName} workoutDate={workoutDate} />

                ) : (

                    <></>)

                }
            </Container>
        </div>
    );
}

export default WorkoutPlanner;




