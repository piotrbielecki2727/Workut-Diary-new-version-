import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useUserId } from '../UserIdContext';
import { useAuth } from '../AuthContext';



import './ChoosedExercise.css';
import axios from 'axios';

import {
    useParams,
    Link,
    useNavigate
} from "react-router-dom";

function ChoosedExercise() {
    const [exercise, setExercise] = useState([]);
    const navigate = useNavigate();
    const { Name } = useParams();

    const { auth } = useAuth();
    const { userId } = useUserId();

    const handleGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/getChoosedExercise/${Name}`)
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log(res.data.results);
                    setExercise(res.data.results[0]);
                    console.log(userId);
                    console.log(auth);

                }
                else {
                    console.error(res.data.Error);
                }

            })
            .catch(err => console.log(err));

    }, [Name]);


    return (
        <div id='background'>
            <Container id='choosedExerciseContainer'>
                <Container id='buttonContainer'>
                    <Button id="backButton" onClick={handleGoBack}>Back</Button>
                </Container>
                <h2>{exercise.Name}</h2>
                <Container id='choosedExerciseContainer2'>
                    <Image src={exercise.gif} alt="exercise_gif" id='exerciseImg' />
                    <h4 id='h4Exercises'>{exercise.description} </h4>
                    <Table bordered hover responsive>
                        <thead>
                            <tr id='theadExercises'>
                                <th>Primary muscles</th>
                                <th>Minor muscles</th>
                                <th>Difficulty</th>
                                <th>Equipment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{exercise.main_muscle_group}</td>
                                <td>{exercise.muscle_group_1}<br></br> {exercise.muscle_group_2}</td>
                                <td>{exercise.difficulty}</td>
                                <td>{exercise.equipment ? exercise.equipment : "---"}</td>
                            </tr>
                        </tbody>
                    </Table>
                    {auth ? (
                        <Button>Jestem autoryzowany</Button>
                    ) : (
                        <></>
                    )}
                </Container >
            </Container >
        </div>
    );
}

export default ChoosedExercise;
