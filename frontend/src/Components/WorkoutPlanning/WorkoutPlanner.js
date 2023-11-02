import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './WorkoutPlanner.css';
import PrintDnDExercises from '../AddingExercisesToWorkout/PrintDnDExercises'
import axios from 'axios';


import {
    Link, useParams, useNavigate
} from "react-router-dom";


function WorkoutPlanner() {
    const [newExerciseAdded, setNewExerciseAdded] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [workout, setWorkout] = useState([]);
    const { workoutId } = useParams();
    const WorkoutPlanner = true;

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/getWorkout/${workoutId}`)
            .then(res => {
                if (res.data.Success) {
                    console.log(res.data.result)
                    setWorkout(res.data.result);
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
                        <Row key={workout.id_workout}>
                            <Col xs={6}id='nameDatePlannerBar'>Workout name: {workout.Name}</Col>
                            <Col xs={5}id='nameDatePlannerBar'>Last performed: {new Date(workout.Date).toLocaleString()}</Col>
                        </Row>
                    ))}

                </Container>
                <PrintDnDExercises WorkoutPlanner={WorkoutPlanner} exercises={exercises} setExercises={setExercises} workoutId={workoutId} newExerciseAdded={newExerciseAdded} setNewExerciseAdded={setNewExerciseAdded} />
            </Container>
        </div>
    );
}

export default WorkoutPlanner;




