import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import './LastWorkout.css';
import {
    useParams, useNavigate
} from "react-router-dom";
import { useUserId } from '../UserIdContext';


function LastWorkout() {

    const [exercises, setExercises] = useState([]);
    const { DoneWorkoutId, workoutName, workoutDate } = useParams();
    const { userId } = useUserId();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }


    useEffect(() => {
        if (userId === null) {
            navigate("/")
        }
        else {
            console.log(DoneWorkoutId);
            axios.get(`http://localhost:3001/getDoneWorkoutDetails/${DoneWorkoutId}`)
                .then(res => {
                    if (res.data.Success) {
                        setExercises(res.data.result);
                        console.log(res.data.result);

                    }
                    else {
                        console.log("Brak cwiczen");
                        setExercises([]);


                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [DoneWorkoutId, userId]);



    return (
        <div id="background">
            {exercises.length > 0 ? (
                <Container id="lastWorkoutContainer">
                    <Button id="WorkoutPlannerButton" onClick={handleGoBack}>
                        Back
                    </Button>
                    <Container id="nameDate">
                        <h3>{workoutName}</h3>
                        <h5>{new Date(workoutDate).toLocaleString()}</h5>
                    </Container>
                    {exercises.map((exercise, index) => (
                        <Container key={exercise.Exercise_id} id="lastWorkoutContainer2">
                            <Row id="lastWorkoutRow">
                                <Col xs={4} lg={3} id="imageCol">
                                    <Image src={exercise.gif} fluid></Image>
                                </Col>
                                <Col xs={8} lg={9}>
                                    <Row id="exerciseNameLastWorkoutRow">
                                        <Col xs={9} lg={11}>
                                            {index + 1}. {exercise.name}
                                        </Col>
                                        <Col xs={3} lg={1}></Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Table
                                                striped
                                                bordered
                                                hover
                                                responsive
                                                id="lastWorkoutTable"
                                            >
                                                <thead>
                                                    <tr id="lastWorkoutThead">
                                                        <th>Set</th>
                                                        <th>Reps</th>
                                                        <th>Weight</th>
                                                        <th>Max rep</th>
                                                        <th>Rest</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {exercise.sets.map((set, setIndex) => (
                                                        <tr id="lastWorkoutBody" key={set.set_id}>
                                                            <td>{setIndex + 1}</td>
                                                            <td>{set.set_reps}</td>
                                                            <td>{set.set_weight}</td>
                                                            <td>{set.set_max}</td>
                                                            <td>{set.set_rest}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    ))}
                </Container>
            ) : (
                <h5>This workout is empty</h5>
            )}
        </div>
    );
}

export default LastWorkout;








